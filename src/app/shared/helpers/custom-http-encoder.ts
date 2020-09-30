import { HttpParameterCodec } from '@angular/common/http';

export class CustomHttpParamEncoder implements HttpParameterCodec {
    encodeKey(key: string): string {
        console.log('encodeKey ', encodeURIComponent(key));
        return encodeURIComponent(key);
    }
    encodeValue(value: string): string {
        console.log('encodeValue:', encodeURIComponent(value));
        return encodeURIComponent(value);
    }
    decodeKey(key: string): string {
        return decodeURIComponent(key);
    }
    decodeValue(value: string): string {
        return decodeURIComponent(value);
    }
}
