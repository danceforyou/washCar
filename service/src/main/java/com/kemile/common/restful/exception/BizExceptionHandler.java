package com.kemile.common.restful.exception;

import javax.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.kemile.common.restful.ResponseT;
import com.kemile.common.restful.ResponseTs;
import com.kemile.common.restful.RtnCodeEnum;

import cz.jirutka.spring.exhandler.handlers.RestExceptionHandler;

@SuppressWarnings("rawtypes")
public class BizExceptionHandler implements RestExceptionHandler {
	
	private static final Logger logger = LoggerFactory.getLogger(BizExceptionHandler.class);

    @SuppressWarnings("unchecked")
	public ResponseEntity handleException(Exception exception, HttpServletRequest request) {
        boolean isDebug = false;
        if(request.getParameter("debug") != null) {
            isDebug = true;
        }

        ResponseT responseT = null;
        if(exception instanceof BizException) {
            responseT = ResponseTs.newResponseException((BizException)exception, isDebug);
            logger.error(((BizException)exception).getMsg());
        } else {
            BizException bizException = null;
            if(isDebug) {
                bizException = new BizException(RtnCodeEnum.UNKNOW.getValue(), RtnCodeEnum.UNKNOW.getDesc(), exception.getMessage());
            } else {
                bizException = new BizException(RtnCodeEnum.UNKNOW.getValue(), RtnCodeEnum.UNKNOW.getDesc());
            }

            responseT = ResponseTs.newResponseException(bizException, isDebug);
            logger.error(exception.getMessage());
        }

        return new ResponseEntity(responseT, HttpStatus.OK);
    }
}
