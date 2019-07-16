<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Insert title here</title>
</head>
<body>
<c:if test="${adminInfos!=null }">
    <c:forEach items="${adminInfos}" var="admin">
        <h1>${admin.adminID}</h1>
        <h1>${admin.adminName}</h1>
        <h1>${admin.adminPassword}</h1>
        <h1>${admin.adminPhone}</h1>
    </c:forEach>
</c:if>
</body>
</html>