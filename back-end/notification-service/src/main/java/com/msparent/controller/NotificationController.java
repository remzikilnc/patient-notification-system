package com.msparent.controller;

import com.msparent.model.StatusResponse;
import com.msparent.service.NotificationService;
import org.springframework.http.ResponseEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    @GetMapping("/ok")
    public ResponseEntity<StatusResponse> ok() {
        return ResponseEntity.ok(StatusResponse.builder().status("OK").message("Notification service is up and running").build());
    }

    @GetMapping("/send")
    public ResponseEntity<StatusResponse> send() {
        notificationService.sendNotification();
        return ResponseEntity.ok(StatusResponse.builder().status("OK").message("Notification sent").build());
    }
}
