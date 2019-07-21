/*
 Navicat Premium Data Transfer

 Source Server         : mysql
 Source Server Type    : MySQL
 Source Server Version : 50554
 Source Host           : localhost:3306
 Source Schema         : yxx

 Target Server Type    : MySQL
 Target Server Version : 50554
 File Encoding         : 65001

 Date: 21/07/2019 12:02:59
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category`  (
  `category_id` tinyint(15) NOT NULL AUTO_INCREMENT COMMENT '类别ID',
  `category` varchar(20) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL COMMENT '类别',
  `class_name` varchar(30) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL COMMENT '图型名称',
  PRIMARY KEY (`category_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = gbk COLLATE = gbk_chinese_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES (0, '二手手机', 'icon-icon--');
INSERT INTO `category` VALUES (1, '数码', 'icon-shuma');
INSERT INTO `category` VALUES (2, '二手图书', 'icon-book');
INSERT INTO `category` VALUES (3, '游戏交易', 'icon-youxi');
INSERT INTO `category` VALUES (4, '服装鞋包', 'icon-Txu-');
INSERT INTO `category` VALUES (5, '美妆闲置', 'icon-meizhuang');
INSERT INTO `category` VALUES (6, '运动户外', 'icon-yundong');
INSERT INTO `category` VALUES (7, '乐器', 'icon-gangqin');
INSERT INTO `category` VALUES (8, '跑腿代办', 'icon-icon6');
INSERT INTO `category` VALUES (9, '其他闲置', 'icon-qita-');

-- ----------------------------
-- Table structure for chat
-- ----------------------------
DROP TABLE IF EXISTS `chat`;
CREATE TABLE `chat`  (
  `chat_id` int(255) NOT NULL AUTO_INCREMENT COMMENT '聊天ID',
  `A_openID` varchar(255) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL COMMENT '我的openID',
  `B_openID` varchar(255) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL COMMENT '对方openID',
  `content` text CHARACTER SET gbk COLLATE gbk_chinese_ci NULL COMMENT '一条消息',
  PRIMARY KEY (`chat_id`) USING BTREE,
  INDEX `ch_myID`(`A_openID`) USING BTREE,
  INDEX `ch_otherID`(`B_openID`) USING BTREE,
  CONSTRAINT `ch_myID` FOREIGN KEY (`A_openID`) REFERENCES `user` (`openID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `ch_otherID` FOREIGN KEY (`B_openID`) REFERENCES `user` (`openID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = gbk COLLATE = gbk_chinese_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for collection
-- ----------------------------
DROP TABLE IF EXISTS `collection`;
CREATE TABLE `collection`  (
  `collection_id` int(255) NOT NULL AUTO_INCREMENT COMMENT '收藏ID',
  `goods_id` int(255) NULL DEFAULT NULL COMMENT '物品ID',
  `openID` varchar(255) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL COMMENT '用户openID',
  PRIMARY KEY (`collection_id`) USING BTREE,
  INDEX `c_openID`(`openID`) USING BTREE,
  INDEX `c_goodsID`(`goods_id`) USING BTREE,
  CONSTRAINT `c_goodsID` FOREIGN KEY (`goods_id`) REFERENCES `goods` (`goods_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `c_openID` FOREIGN KEY (`openID`) REFERENCES `user` (`openID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = gbk COLLATE = gbk_chinese_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for goods
-- ----------------------------
DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods`  (
  `goods_id` int(255) NOT NULL AUTO_INCREMENT COMMENT '物品ID',
  `goods_name` varchar(255) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL COMMENT '物品名称',
  `goods_describe` varchar(255) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL COMMENT '物品描述',
  `goods_price` decimal(20, 2) NULL DEFAULT NULL COMMENT '物品价格',
  `goods_image` text CHARACTER SET gbk COLLATE gbk_chinese_ci NULL COMMENT '物品图片地址',
  `category_id` tinyint(15) NULL DEFAULT NULL COMMENT '物品类别ID',
  `status` tinyint(5) NULL DEFAULT NULL COMMENT '物品状态: 0：未售出 1：售出',
  `create_time` datetime NULL DEFAULT NULL COMMENT '物品发布时间',
  `sale_time` datetime NULL DEFAULT NULL COMMENT '售出时间',
  `openID` varchar(255) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL COMMENT '卖家openID',
  PRIMARY KEY (`goods_id`) USING BTREE,
  INDEX `g_openID`(`openID`) USING BTREE,
  INDEX `g_categoryID`(`category_id`) USING BTREE,
  CONSTRAINT `g_categoryID` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `g_openID` FOREIGN KEY (`openID`) REFERENCES `user` (`openID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = gbk COLLATE = gbk_chinese_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of goods
-- ----------------------------
INSERT INTO `goods` VALUES (1, '1', '板凳', 1.00, '1', 9, 0, '2019-07-04 11:58:06', NULL, '1');
INSERT INTO `goods` VALUES (2, '2', '手机', 2.00, '2', 0, 0, '2019-07-24 12:16:06', NULL, '1');
INSERT INTO `goods` VALUES (3, '2', '手机', 3.00, '1', 0, 0, '2019-07-24 12:16:24', NULL, '1');
INSERT INTO `goods` VALUES (4, '3', '惠普笔记本', 4.00, '1', 1, 0, '2019-07-26 14:39:02', NULL, '1');
INSERT INTO `goods` VALUES (5, '2', '轮椅', 5.00, '1', 6, 0, '2019-07-07 20:34:14', NULL, '1');
INSERT INTO `goods` VALUES (6, '3', '板凳', 5.00, '2', 9, 0, '2019-07-10 22:21:41', NULL, '1');
INSERT INTO `goods` VALUES (7, '3', '书桌', 5.00, '1', 9, 0, '2019-07-23 22:23:21', NULL, '1');
INSERT INTO `goods` VALUES (8, '32', '破鞋', 3.00, '1', 6, 0, '2019-07-24 22:24:30', NULL, '1');
INSERT INTO `goods` VALUES (9, '2', '钢铁侠手办', 2.00, '3', 9, 0, '2019-07-03 22:25:02', NULL, '1');
INSERT INTO `goods` VALUES (10, '23', '联想笔记本', 2.00, '3', 1, 0, '2019-06-24 22:25:16', NULL, '1');
INSERT INTO `goods` VALUES (11, '32', 'X洗面奶', 2.00, '3', 5, 0, '2019-07-11 22:25:34', NULL, '1');
INSERT INTO `goods` VALUES (12, '32', 'ipad', 22.00, '3', 1, 0, '2019-07-02 22:26:47', NULL, '1');
INSERT INTO `goods` VALUES (13, '323', '斗破苍穹', 22.00, '2', 2, 0, '2019-07-03 11:56:22', NULL, '1');

-- ----------------------------
-- Table structure for message
-- ----------------------------
DROP TABLE IF EXISTS `message`;
CREATE TABLE `message`  (
  `message_id` int(255) NOT NULL AUTO_INCREMENT COMMENT '留言ID',
  `goods_id` int(255) NULL DEFAULT NULL COMMENT '物品ID',
  `message` varchar(255) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL COMMENT '留言信息',
  `openID` varchar(255) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL COMMENT '留言用户openID',
  PRIMARY KEY (`message_id`) USING BTREE,
  INDEX `m_openID`(`openID`) USING BTREE,
  INDEX `m_goodsID`(`goods_id`) USING BTREE,
  CONSTRAINT `m_goodsID` FOREIGN KEY (`goods_id`) REFERENCES `goods` (`goods_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `m_openID` FOREIGN KEY (`openID`) REFERENCES `user` (`openID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = gbk COLLATE = gbk_chinese_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for orders
-- ----------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders`  (
  `orders_id` int(255) NOT NULL AUTO_INCREMENT COMMENT '订单ID',
  `goods_id` int(255) NULL DEFAULT NULL COMMENT '物品ID',
  `status` tinyint(5) NULL DEFAULT NULL COMMENT '订单状态',
  `buyer` varchar(255) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL COMMENT '买家openID',
  `seller` varchar(255) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL COMMENT '卖家openID',
  `create_time` datetime NULL DEFAULT NULL COMMENT '订单创建时间',
  PRIMARY KEY (`orders_id`) USING BTREE,
  INDEX `o_goodsID`(`goods_id`) USING BTREE,
  INDEX `o_buyer`(`buyer`) USING BTREE,
  INDEX `o_seller`(`seller`) USING BTREE,
  CONSTRAINT `o_buyer` FOREIGN KEY (`buyer`) REFERENCES `user` (`openID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `o_goodsID` FOREIGN KEY (`goods_id`) REFERENCES `goods` (`goods_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `o_seller` FOREIGN KEY (`seller`) REFERENCES `user` (`openID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = gbk COLLATE = gbk_chinese_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `user_id` int(255) NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `openID` varchar(255) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL COMMENT 'openID',
  `user_name` varchar(255) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL COMMENT '用户名',
  `user_image` varchar(255) CHARACTER SET gbk COLLATE gbk_chinese_ci NULL DEFAULT NULL COMMENT '用户头像地址',
  `blacklist` tinyint(255) NULL DEFAULT NULL COMMENT '用户被拉黑次数',
  PRIMARY KEY (`user_id`) USING BTREE,
  INDEX `openID`(`openID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2223 CHARACTER SET = gbk COLLATE = gbk_chinese_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1111, '1', 'aaa', 'aaa', 1);
INSERT INTO `user` VALUES (2222, '2', 'bbb', 'bbb', 2);

SET FOREIGN_KEY_CHECKS = 1;
