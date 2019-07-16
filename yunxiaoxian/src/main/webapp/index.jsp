<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Insert title here</title>
</head>
<body>
<jsp:useBean id="user" class="com.myee.pojo.AdminInfo" scope="request"></jsp:useBean>
<form action="${pageContext.request.contextPath}/showAllAdmin" method="post">
    <input type="text" name="adminName"/>
    <input type="text" name="adminPassword"/>
    <input type="submit" value="提交"/>
</form>
<button onclick="window.location.href='${pageContext.request.contextPath}/showAllAdmin'">点击</button>
</body>
</html>