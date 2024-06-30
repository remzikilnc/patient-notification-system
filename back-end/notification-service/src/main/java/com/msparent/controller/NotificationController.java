package com.msparent.controller;

import com.msparent.dto.StatusResponse;
import com.msparent.model.Template;
import com.msparent.service.TemplateService;
import com.msparent.service.notification.NotificationExecutor;
import org.springframework.http.ResponseEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationExecutor notificationExecutor;
    private final TemplateService templateService;

    @GetMapping("/ok")
    public ResponseEntity<StatusResponse> ok() {
        return ResponseEntity.ok(StatusResponse.builder().status("OK").message("Notification service is up and running").build());
    }

    @GetMapping("/send/{id}")
    public ResponseEntity<StatusResponse> send(@PathVariable Long id) {
        Template template = templateService.getTemplate(id);
        if (templateService.getTemplate(id) == null) {
            return ResponseEntity.badRequest().body(StatusResponse.builder().status("ERROR").message("Template not found").build());
        } else {
            notificationExecutor.send(template);
            return ResponseEntity.ok(StatusResponse.builder().status("OK").message("Notification sent").build());
        }
    }
}
