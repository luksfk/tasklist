using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using TaskList.Infra.CrossCutting.Identity.Models;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using TaskList.Infra.CrossCutting.Identity.Authorization;
using Microsoft.Extensions.Options;
using TaskList.Domain.Interfaces;
using System.Collections;
using System.Collections.Generic;

namespace TaskList.Services.Api.Controllers
{
    public class AccountController : BaseController
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly JwtTokenOptions _jwtTokenOptions;

        public AccountController(
                    UserManager<ApplicationUser> userManager,
                    SignInManager<ApplicationUser> signInManager,
                    IOptions<JwtTokenOptions> jwtTokenOptions,
                    IUser user
                    ) : base(user)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _jwtTokenOptions = jwtTokenOptions.Value;

            ThrowIfInvalidOptions(_jwtTokenOptions);
        }

        private static long ToUnixEpochDate(DateTime date)
      => (long)Math.Round((date.ToUniversalTime() - new DateTimeOffset(1970, 1, 1, 0, 0, 0, TimeSpan.Zero)).TotalSeconds);

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] LoginViewModel model)
        {
            var errors = new List<string>();
            if (!ModelState.IsValid)
            {
                errors = ModelState.Values.SelectMany(value => value.Errors.Select(error => error.ErrorMessage)).ToList();
                return BadRequest(errors);
            }           

            var result = await _signInManager.PasswordSignInAsync(model.Usuario, model.Senha, false, true);

            if (result.Succeeded)
            {
                var response = GerarTokenUsuario(model);
                return Ok(response);
            }
            errors.Add("Usuário ou senha incorretos");
            return BadRequest(errors);
        }

        private async Task<object> GerarTokenUsuario(LoginViewModel login)
        {
            var user = await _userManager.FindByNameAsync(login.Usuario);
            var userClaims = await _userManager.GetClaimsAsync(user);

            userClaims.Add(new Claim(JwtRegisteredClaimNames.Sub, user.Id));
            userClaims.Add(new Claim(JwtRegisteredClaimNames.Email, user.Email));
            userClaims.Add(new Claim(JwtRegisteredClaimNames.Jti, await _jwtTokenOptions.JtiGenerator()));
            userClaims.Add(new Claim(JwtRegisteredClaimNames.Iat, ToUnixEpochDate(_jwtTokenOptions.IssuedAt).ToString(), ClaimValueTypes.Integer64));

            var jwt = new JwtSecurityToken(
                  issuer: _jwtTokenOptions.Issuer,
                  audience: _jwtTokenOptions.Audience,
                  claims: userClaims,
                  notBefore: _jwtTokenOptions.NotBefore,
                  expires: _jwtTokenOptions.Expiration,
                  signingCredentials: _jwtTokenOptions.SigningCredentials);

            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            var response = new
            {
                access_token = encodedJwt,
                expires_in = (int)_jwtTokenOptions.ValidFor.TotalSeconds,
                user = new
                {
                    id = user.Id,
                    nome = user.UserName,
                    email = user.Email,
                    claims = userClaims.Select(c => new { c.Type, c.Value })
                }
            };

            return response;
        }


        private static void ThrowIfInvalidOptions(JwtTokenOptions options)
        {
            if (options == null) throw new ArgumentNullException(nameof(options));

            if (options.ValidFor <= TimeSpan.Zero)
            {
                throw new ArgumentException("Must be a non-zero TimeSpan.", nameof(JwtTokenOptions.ValidFor));
            }

            if (options.SigningCredentials == null)
            {
                throw new ArgumentNullException(nameof(JwtTokenOptions.SigningCredentials));
            }

            if (options.JtiGenerator == null)
            {
                throw new ArgumentNullException(nameof(JwtTokenOptions.JtiGenerator));
            }
        }
    }
}