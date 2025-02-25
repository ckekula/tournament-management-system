package com.tms.backend.exception;

import graphql.ErrorClassification;
import graphql.GraphQLError;
import graphql.language.SourceLocation;
import java.util.List;
import java.util.Map;

public class GraphQLException extends RuntimeException implements GraphQLError {

    private final String message;

    public GraphQLException(String message) {
        super(message);
        this.message = message;
    }

    public GraphQLException(String message, Throwable cause) {
        super(message, cause);
        this.message = message;
    }

    @Override
    public String getMessage() {
        return message;
    }

    @Override
    public List<SourceLocation> getLocations() {
        return List.of();
    }

    @Override
    public ErrorClassification getErrorType() {
        return null;
    }

    @Override
    public Map<String, Object> getExtensions() {
        return Map.of("errorType", "GraphQLException", "message", message);
    }
}
