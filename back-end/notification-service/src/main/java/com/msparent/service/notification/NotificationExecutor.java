package com.msparent.service.notification;

import com.msparent.model.Template;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationExecutor {

    private final NotificationFactory notificationFactory;

    public void send(Template template) {
        template.getCriterias()
                .forEach(criteria -> {
                    log.debug("Criteria: {}", criteria);
                    template.getNotificationTypes()
                            .forEach(notificationType -> {
                                log.debug("Notification Type: {}", notificationType);
                                notificationFactory.execute(notificationType.toString(), template, criteria);
                            });
                });
    }
}