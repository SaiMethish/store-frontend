import { Component } from '@angular/core';

@Component({
  selector: 'app-page404',
  template: `
  <div class="not-found">
    <h1>404 Not Found</h1>
    <p>Your visited page not found. You may go home page.</p>
    <button routerLink="/">Back to home page</button>
  </div>
  `,
  styles: [
    `
    .not-found{
    display: flex;
    flex-direction: column;
    width: 829px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 13%;
    align-items: center;
    h1{
        font-family: "Inter";
        font-weight: bold;
        font-size: 110px;
        line-height: 50px;
        letter-spacing: 4px;
        // padding:1%;
        // margin:1%;
    }
    p{
      margin-top:5%;
      padding:2%;
        font-size: 16px;
        font-weight: normal;
        font-family: "Poppins";
        line-height: 24px;
    }
    button{
        margin-top: 2%;
        width: 254px;
        height: 56px;
        padding: 8px 24px 8px 24px;
        font-family: "Poppins";
        font-size: 16px;
        color: white;
        background-color: #DB4444;
        cursor: pointer;
    }
    }
    `
  ]
})
export class Page404Component {

}
