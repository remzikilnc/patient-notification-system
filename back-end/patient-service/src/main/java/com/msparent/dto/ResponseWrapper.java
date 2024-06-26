package com.msparent.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResponseWrapper<T> {
    private Meta meta;
    private T data;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Meta {
        private int last_page;
        private int current_page;
        private long totalElements;
        private boolean first;
        private boolean last;
        private int size;
        private boolean empty;
    }

}
