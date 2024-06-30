package com.msparent.controller;

import com.msparent.dto.StatusResponse;
import com.msparent.dto.template.TemplateRequest;
import com.msparent.mapper.TemplateMapper;
import com.msparent.model.Template;
import com.msparent.service.TemplateService;
import com.msparent.service.notification.NotificationExecutor;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationExecutor notificationExecutor;
    private final TemplateService templateService;
    private final TemplateMapper templateMapper;

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
            return ResponseEntity.ok(StatusResponse.builder().status("OK").message("Notification sent to all targets").build());
        }
    }
/*
    @PostMapping("/send")
    public ResponseEntity<StatusResponse> send(@Valid @RequestBody TemplateRequest templateRequest) {
        Template template = templateMapper.mapToEntity(new Template(), templateRequest);
        notificationExecutor.send(template);
        return ResponseEntity.ok(StatusResponse.builder().status("OK").message("Notification sent to criterias").build());
    }*/
}
