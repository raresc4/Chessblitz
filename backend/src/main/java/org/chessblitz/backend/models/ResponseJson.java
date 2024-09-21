package org.chessblitz.backend.models;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class ResponseJson {
    private String message;
    private boolean success;
    private int code;
}
