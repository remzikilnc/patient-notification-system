package com.msparent.dto.template;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.msparent.model.Criteria;
import com.msparent.model.patient.NotificationType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TemplateRequest {
    @NotNull(message = "Title cannot be null")
    @NotBlank(message = "Title cannot be blank")
    @Size(max = 255, min = 2, message = "Title must be between 2 and 255 characters")
    private String title;

    @Size(max = 1000, message = "Message must be less than 1000 characters")
    private String htmlMessage;
    @Size(max = 1000, message = "Text message must be less than 1000 characters")
    private String textMessage;
    private List<NotificationType> notificationTypes;
}
