package com.yxx.conversiom;

public class IntegerToString implements org.springframework.core.convert.converter.Converter<Integer, String> {
    @Override
    public String convert(Integer integer) {
        return Integer.toString(integer);
    }
}