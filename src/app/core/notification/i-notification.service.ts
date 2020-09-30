import { Observable } from 'rxjs';

export interface INotificationService {
    getAlert(): Observable<any>;
    success(message: string, keepAfterRouteChange?: boolean): void;
    error(message: string, keepAfterRouteChange?: boolean): void;
    clear(): void;
}
