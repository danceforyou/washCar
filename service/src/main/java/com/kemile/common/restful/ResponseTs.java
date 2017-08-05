package com.kemile.common.restful;

import com.kemile.common.restful.exception.BizException;

public class ResponseTs {
	public ResponseTs() {
    }

    public static <T> ResponseT<T> newUnknow() {
        ResponseT<T> responseT = new ResponseT<T>(RtnCodeEnum.UNKNOW);
        return responseT;
    }

    public static <T> ResponseT<T> newOK() {
        ResponseT<T> responseT = new ResponseT<T>(RtnCodeEnum.SUCCESS);
        return responseT;
    }

    public static <T> ResponseT<T> newResponseException(BizException ex, boolean isDebug) {
        ResponseT<T> responseT = new ResponseT<T>(ex, isDebug);
        return responseT;
    }

    public static <T> ResponseT<T> newResponseException(BizException ex) {
        ResponseT<T> responseT = new ResponseT<T>(ex);
        return responseT;
    }

    public static <T> ResponseT<T> newResponse(T bizData) {
        ResponseT<T> responseT = new ResponseT<T>(RtnCodeEnum.SUCCESS);
        responseT.setBizData(bizData);
        return responseT;
    }

    public static <T> ResponseT<T> newNetError() {
        ResponseT<T> responseT = new ResponseT<T>(RtnCodeEnum.NET_ERROR);
        return responseT;
    }

    public static <T> ResponseT<T> newParamError() {
        ResponseT<T> responseT = new ResponseT<T>(RtnCodeEnum.UNKNOW);
        return responseT;
    }

    public static <T> ResponseT<T> newOverLimit() {
        ResponseT<T> responseT = new ResponseT<T>(RtnCodeEnum.APP_OVER_INVOCATION_LIMIT);
        return responseT;
    }
}
