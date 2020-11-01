import { Config } from './../../models/config';
import { ConfigService } from './../config.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss'],
})
export class ConfigComponent implements OnInit {
  config: Config;
  token: string;
  constructor(private configService: ConfigService) {}

  ngOnInit(): void {}

  showConfig() {
    this.configService.getConfig().subscribe(
      (data: Config) =>
        (this.config = {
          token: data.token,
        })
    );
  }

  showConfigResponse() {
    this.configService
      .getConfigResponse()
      // resp is of type `HttpResponse<Config>`
      .subscribe((resp) => {
        // display its headers
        this.token = resp.headers.get('token');
        console.log('token: ' + this.token);
        // const keys = resp.headers.keys();
        // this.headers = keys.map((key) => `${key}: ${resp.headers.get(key)}`);

        // access the body directly, which is typed as `Config`.
        // this.config = { ...resp.body };
      });
  }
}
