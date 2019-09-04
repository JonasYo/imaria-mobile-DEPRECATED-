import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-conta',
  templateUrl: './conta.page.html',
  styleUrls: ['./conta.page.scss'],
})
export class ContaPage implements OnInit {
  private roseGoldBackground = '../../../assets/images/rose-gold.jpg';

  selectedTab = 'alterarDados';

  constructor() { }

  ngOnInit() {
  }

}
