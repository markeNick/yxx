package com.yxx.aspect;

import org.apache.log4j.Logger;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;

import java.util.Arrays;

@Aspect
public class ControllerLogger {
    private static final Logger logger = Logger.getLogger(ControllerLogger.class);

    @Pointcut("execution(* com.yxx.controller.*Controller.*(..))")
    public void pointcut(){}

    @Before("pointcut()")
    public void before(JoinPoint jp){
        logger.debug("调用" + jp.getTarget() + "的" + jp.getSignature().getName() +"方法，参数：" + Arrays.toString(jp.getArgs()));
    }

    @AfterReturning(pointcut = "pointcut()", returning = "returnValue")
    public void afterReturning(JoinPoint jp, Object returnValue){
        logger.debug("调用" + jp.getTarget() + "的" + jp.getSignature().getName() +"方法，返回值：" + returnValue);
    }

}