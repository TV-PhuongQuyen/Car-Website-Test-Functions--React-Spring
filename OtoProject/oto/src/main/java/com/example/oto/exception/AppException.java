package com.example.oto.exception;

import lombok.Data;

@Data
public class AppException extends RuntimeException{
    private ErrorCode errorCode;
    private TrueCode trueCode;


    public static AppException off(ErrorCode errorCode){
        AppException appException = new AppException();
        appException.setErrorCode(errorCode);
        return appException;
    }
    public static AppException of(TrueCode trueCode){
        AppException appException = new AppException();
        appException.setTrueCode(trueCode);
        return appException;
    }
}
