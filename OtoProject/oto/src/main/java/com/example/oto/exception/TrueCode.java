package com.example.oto.exception;

import com.fasterxml.jackson.annotation.JsonValue;
import lombok.Getter;

import java.util.HashMap;
import java.util.Map;

@Getter
public enum TrueCode {
    ADD(1, "Thêm thành công"),
    UPDATE(2, "Cập nhật thành công"),
    DELETE(3, "Xóa thành công"),
    CHECK(4, "Kiểm tra thành công"),
    LOGOUT(5, "Đăng xuất thành công"),
    ERROR(400, "Lỗi xử lý");
    private final int code;
    private final String message;

    TrueCode(int code, String message) {
        this.code = code;
        this.message = message;
    }
    @JsonValue
    public Map<String, Object> toJson() {
        Map<String, Object> map = new HashMap<>();
        map.put("code", code);
        map.put("message", message);
        return map;
    }
}
