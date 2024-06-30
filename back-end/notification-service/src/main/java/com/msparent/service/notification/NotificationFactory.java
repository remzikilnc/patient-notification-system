package com.msparent.service.notification;

import com.msparent.model.Criteria;
import com.msparent.model.Template;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class NotificationFactory {
    private final Map<String, NotificationService> notificationServiceMap;

    public NotificationFactory(Map<String, NotificationService> notificationServices) {
        this.notificationServiceMap = notificationServices;
    }

    public NotificationService getNotificationService(String notificationType) {
        NotificationService notificationService = notificationServiceMap.get(notificationType);
        if (notificationService == null) {
            throw new RuntimeException("Unsupported notification type");
        }

        return notificationService;
    }

    public void execute(String notificationType, Template template, Criteria criteria) {
        NotificationService notificationService = getNotificationService(notificationType);
        notificationService.sendNotifications(template, criteria);
    }
}