import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  roleUser: number;

  constructor(private storage: Storage) {
    this.getRoleUser();
  }

  async getRoleUser() {
    let { userRoles } = await this.storage.get('user');
    userRoles.map((role, index) => {
      if (role.is_actived === 1 && (role.role_id === 1 || role.role_id === 2)) {
        this.roleUser = role.role_id;
      }
    });
  }
}
