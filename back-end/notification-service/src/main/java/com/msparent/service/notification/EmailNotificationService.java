package com.msparent.service.notification;

import com.msparent.model.Criteria;
import com.msparent.model.Template;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service("EMAIL")
@Slf4j
public class EmailNotificationService implements NotificationService{

    private final JavaMailSender javaMailSender;

    @Override
    @Async
    public void sendNotifications(Template template, Criteria criteria) {
        criteria.getTargetPatients().forEach(patient -> sendEmail(patient.getPatientEmail(), template));
    }

    private void sendEmail(String email, Template template) {
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(email);
            helper.setSubject(template.getTitle());
            helper.setText(template.getHtmlMessage(), true);
            javaMailSender.send(message);
        } catch (Exception e) {
            log.error("Error while sending email to {}", email, e);
        }
    }
}
