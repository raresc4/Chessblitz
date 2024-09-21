package org.chessblitz.backend.data;

import org.chessblitz.backend.configs.DatabaseConfig;
import org.chessblitz.backend.models.ResponseJson;
import org.chessblitz.backend.models.User;
import org.springframework.beans.ConfigurablePropertyAccessor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.xml.crypto.Data;
import java.io.FileInputStream;
import java.io.IOException;
import java.sql.*;
import java.util.Properties;

@RestController
@RequestMapping("/crud")
public class CrudOperations {
    @PostMapping("/verifyUser")
    public ResponseJson verifyUser(@RequestBody User user) throws IOException, SQLException {
        try {
            Connection con = DatabaseConfig.databaseConfiguration();
            String sql = "SELECT * FROM USERS WHERE username ='" + user.getUsername() + "' AND pass ='" + user.getPassword() + "'";
            Statement stmt = con.createStatement();
            ResultSet rs = stmt.executeQuery(sql);
            if (rs.next()) {
                rs.close();
                con.close();
                return new ResponseJson("User verified!", true, 200);re
            } else {
                rs.close();
                con.close();
                return new ResponseJson("User not verified!", false, 404);
            }
        } catch (Exception e) {
            return new ResponseJson(e.getMessage(), false, 500);
        }
    }
    @GetMapping("/getUser/{name}")
    public ResponseJson giveUser(@PathVariable String name) throws IOException, SQLException {
        try {
            Connection con = DatabaseConfig.databaseConfiguration();
            String sql = "SELECT * FROM USERS WHERE username ='" + name + "'";
            Statement stmt = con.createStatement();
            ResultSet rs = stmt.executeQuery(sql);
            if (rs.next()) {
                rs.close();
                con.close();
                ResponseJson response = new ResponseJson("User found!", true, 200);
                return response;
            } else {
                rs.close();
                con.close();
                return new ResponseJson("Incorrect password!", false, 404);
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseJson(e.getMessage(), false, 500);
        }
    }
    @PostMapping("/insertUser")
    public ResponseJson insertUser(@RequestBody User user) throws IOException {
        try {
            Connection con = DatabaseConfig.databaseConfiguration();
            String sql = "INSERT INTO USERS (id, email, username, pass) VALUES (?, ?, ?, ?)";
            PreparedStatement ps = con.prepareStatement(sql);

            ps.setString(1, user.getId());
            ps.setString(2, user.getEmail());
            ps.setString(3, user.getUsername());
            ps.setString(4, user.getPassword());

            int rowsAffected = ps.executeUpdate();
            ps.close();
            con.close();

            if (rowsAffected > 0) {
                return new ResponseJson("User inserted successfully!", true, 200);
            } else {
                return new ResponseJson("User not inserted!", false, 404);
            }
        } catch (Exception e) {
            return new ResponseJson(e.getMessage(), false, 500);
        }
    }
}
