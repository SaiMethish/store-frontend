import { Component } from '@angular/core';

@Component({
  selector: 'app-loading',
  template: `
  
  <ngx-spinner bdColor = "rgba(0, 0, 0, 0.8)" size = "medium" color = "#fff" type = "pacman" [fullScreen] = "true"><p style="color: white" > Loading... </p></ngx-spinner>
  
  `,
  styles: [``]
})
export class LoadingComponent {

}
