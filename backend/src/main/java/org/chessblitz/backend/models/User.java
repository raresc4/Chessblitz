package org.chessblitz.backend.models;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class User {
    private String id;
    private String email;
    private String username;
    private String password;
}
