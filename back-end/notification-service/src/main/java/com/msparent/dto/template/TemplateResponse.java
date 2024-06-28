package com.msparent.dto.template;

import com.msparent.model.Criteria;
import com.msparent.model.patient.NotificationType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TemplateResponse {
    private Long id;
    private String title;
    private String message;
    private List<Criteria> criterias;
    private List<NotificationType> notificationTypes;
}

