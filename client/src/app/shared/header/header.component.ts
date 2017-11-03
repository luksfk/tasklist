import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public user;
  public nome: string = "";

  constructor(private router: Router) {
    this.user = JSON.parse(localStorage.getItem('eio.user'));
  }

  public isCollapsed: boolean = true;

  ngOnInit() {
    if (this.user)
      this.nome = this.user.nome;
  }

  logout() {
    this.router.navigateByUrl('/login');
  }

}
