package org.chessblitz.backend.configs;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.FileInputStream;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;

public class DatabaseConfig {
    public static Connection databaseConfiguration() throws IOException, SQLException {
        Properties prop = new Properties();
        prop.load(new FileInputStream("src/main/resources/application.properties"));
        String username = prop.getProperty("user");
        String password = prop.getProperty("password");
        String connectionString = prop.getProperty("connectionString");
        Connection con = DriverManager.getConnection(
                "jdbc:sqlserver://" + connectionString + "user=" + username + ";password=" + password + ";encrypt=true;trustServerCertificate=false;hostNameInCertificate=*.database.windows.net;loginTimeout=30;");
        return con;
    }
}
