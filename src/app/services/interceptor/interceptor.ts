import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
} from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AlertController, Events } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ToastService } from '../toast/toast.service';

@Injectable()
export class InterceptorProvider implements HttpInterceptor {

    constructor(private alertController: AlertController, private storage: Storage, private events: Events, private toastServ: ToastService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return from(this.storage.get('token'))
            .pipe(
                switchMap(token => {
                    if (token) {
                        request = request.clone({
                            setHeaders: {
                                Accept: `application/json`,
                                'Content-Type': `application/json`,
                                Authorization: `Bearer ${token}`
                            }
                        });
                    }

                    if (!request.headers.has('Content-Type')) {
                        request = request.clone({
                            setHeaders: {
                                'content-type': 'application/json'
                            }
                        });
                    }

                    return next.handle(request).pipe(
                        catchError(error => {
                            alert(JSON.stringify(error))
                            if (error.status === 401) {
                                this.toastServ.toastDinamicoErro('Token inválido, sessão encerrada');
                                this.events.publish('logout');
                            } else if (error.status > 500) {
                                this.toastServ.toastDinamicoAviso('Ocorreu um erro durante a comunicação com o servidor');
                            }
                            return throwError(error);
                        })
                    );
                })
            );
    }
}
