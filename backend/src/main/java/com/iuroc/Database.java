package com.iuroc;

import java.net.URL;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

class Database {
    public static Connection getConn() throws SQLException {
        URL url = Database.class.getClassLoader().getResource("pexels_data.db");
        String path = url.getPath();
        String jdbcUri = String.format("jdbc:sqlite:%s", path);
        Connection connection = DriverManager.getConnection(jdbcUri);
        return connection;
    }
}
