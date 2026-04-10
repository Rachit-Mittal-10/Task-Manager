import path from "node:path";
import swaggerJsdoc, { type Options } from "swagger-jsdoc";

const swaggerOptions: Options = {
    definition: {
        openapi: "3.0.3",
        info: {
            title: "Task Manager API",
            version: "1.0.0",
            description: "OpenAPI documentation for the Task Manager backend.",
        },
        servers: [
            {
                url: `http://${process.env.HOST ?? "localhost"}:${process.env.PORT ?? "3000"}`,
                description: "Local development server",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
            schemas: {
                ErrorResponse: {
                    type: "object",
                    properties: {
                        ok: {
                            type: "boolean",
                            example: false,
                        },
                        message: {
                            type: "string",
                            example: "Request failed",
                        },
                        error: {
                            type: "string",
                            example: "Internal server error",
                        },
                    },
                },
                LoginRequest: {
                    type: "object",
                    properties: {
                        username: {
                            type: "string",
                            example: "johndoe",
                        },
                        email: {
                            type: "string",
                            format: "email",
                            example: "john@example.com",
                        },
                        password: {
                            type: "string",
                            format: "password",
                            example: "StrongPassword123!",
                        },
                    },
                    required: ["password"],
                },
                RegisterRequest: {
                    type: "object",
                    properties: {
                        username: {
                            type: "string",
                            example: "johndoe",
                        },
                        email: {
                            type: "string",
                            format: "email",
                            example: "john@example.com",
                        },
                        password: {
                            type: "string",
                            format: "password",
                            example: "StrongPassword123!",
                        },
                        firstname: {
                            type: "string",
                            example: "John",
                        },
                        middlename: {
                            type: "string",
                            nullable: true,
                            example: "A",
                        },
                        lastname: {
                            type: "string",
                            nullable: true,
                            example: "Doe",
                        },
                        age: {
                            type: "integer",
                            nullable: true,
                            example: 28,
                        },
                    },
                    required: ["username", "email", "password", "firstname"],
                },
                AuthSuccessResponse: {
                    type: "object",
                    properties: {
                        message: {
                            type: "string",
                            example: "Login Successful",
                        },
                        token: {
                            type: "string",
                            example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                        },
                    },
                },
                RegisterSuccessResponse: {
                    type: "object",
                    properties: {
                        result: {
                            type: "integer",
                            example: 12,
                        },
                    },
                },
                Task: {
                    type: "object",
                    properties: {
                        id: {
                            type: "integer",
                            example: 1,
                        },
                        user_id: {
                            type: "integer",
                            example: 7,
                        },
                        title: {
                            type: "string",
                            example: "Ship Swagger docs",
                        },
                        description: {
                            type: "string",
                            nullable: true,
                            example: "Add documentation support for the backend API",
                        },
                        status: {
                            type: "string",
                            enum: ["planned", "in_progress", "completed"],
                            example: "planned",
                        },
                        priority: {
                            type: "string",
                            enum: ["low", "medium", "high", "not_set"],
                            example: "medium",
                        },
                        start: {
                            type: "string",
                            format: "date",
                            nullable: true,
                        },
                        end: {
                            type: "string",
                            format: "date",
                            nullable: true,
                        },
                        created_at: {
                            type: "string",
                            format: "date-time",
                        },
                        updated_at: {
                            type: "string",
                            format: "date-time",
                        },
                    },
                },
                TaskCreateRequest: {
                    type: "object",
                    properties: {
                        title: {
                            type: "string",
                            example: "Ship Swagger docs",
                        },
                        description: {
                            type: "string",
                            nullable: true,
                            example: "Expose /api-docs and add route comments",
                        },
                        status: {
                            type: "string",
                            enum: ["planned", "in_progress", "completed"],
                        },
                        priority: {
                            type: "string",
                            enum: ["low", "medium", "high", "not_set"],
                        },
                        start: {
                            type: "string",
                            format: "date",
                            nullable: true,
                        },
                        end: {
                            type: "string",
                            format: "date",
                            nullable: true,
                        },
                    },
                    required: ["title"],
                },
                TaskMutationResponse: {
                    type: "object",
                    properties: {
                        ok: {
                            type: "boolean",
                            example: true,
                        },
                        data: {
                            oneOf: [
                                {
                                    type: "integer",
                                    example: 5,
                                },
                                {
                                    type: "string",
                                    example: "1 row(s) updated successfully",
                                },
                            ],
                        },
                    },
                },
                TaskListResponse: {
                    type: "object",
                    properties: {
                        ok: {
                            type: "boolean",
                            example: true,
                        },
                        data: {
                            type: "array",
                            items: {
                                $ref: "#/components/schemas/Task",
                            },
                        },
                    },
                },
                TaskItemResponse: {
                    type: "object",
                    properties: {
                        ok: {
                            type: "boolean",
                            example: true,
                        },
                        data: {
                            $ref: "#/components/schemas/Task",
                        },
                    },
                },
                User: {
                    type: "object",
                    properties: {
                        id: {
                            type: "integer",
                            example: 7,
                        },
                        firstname: {
                            type: "string",
                            example: "John",
                        },
                        middlename: {
                            type: "string",
                            nullable: true,
                            example: "A",
                        },
                        lastname: {
                            type: "string",
                            nullable: true,
                            example: "Doe",
                        },
                        age: {
                            type: "integer",
                            nullable: true,
                            example: 28,
                        },
                        created_at: {
                            type: "string",
                            format: "date-time",
                        },
                        updated_at: {
                            type: "string",
                            format: "date-time",
                        },
                    },
                },
                UserListResponse: {
                    type: "object",
                    properties: {
                        ok: {
                            type: "boolean",
                            example: true,
                        },
                        data: {
                            type: "array",
                            items: {
                                $ref: "#/components/schemas/User",
                            },
                        },
                    },
                },
                UserItemResponse: {
                    type: "object",
                    properties: {
                        ok: {
                            type: "boolean",
                            example: true,
                        },
                        data: {
                            $ref: "#/components/schemas/User",
                        },
                    },
                },
                UserUpdateRequest: {
                    type: "object",
                    properties: {
                        firstname: {
                            type: "string",
                        },
                        middlename: {
                            type: "string",
                            nullable: true,
                        },
                        lastname: {
                            type: "string",
                            nullable: true,
                        },
                        age: {
                            type: "integer",
                            nullable: true,
                        },
                    },
                },
                DashboardResponse: {
                    type: "object",
                    properties: {
                        totalTasks: {
                            type: "integer",
                            example: 12,
                        },
                        statusCounts: {
                            type: "object",
                            additionalProperties: {
                                type: "integer",
                            },
                            example: {
                                planned: 4,
                                in_progress: 5,
                                completed: 3,
                            },
                        },
                        priorityCounts: {
                            type: "object",
                            additionalProperties: {
                                type: "integer",
                            },
                            example: {
                                low: 2,
                                medium: 6,
                                high: 3,
                                not_set: 1,
                            },
                        },
                    },
                },
            },
        },
    },
    apis: [
        path.resolve(process.cwd(), "src/app/**/*.ts"),
        path.resolve(process.cwd(), "src/features/**/*.ts"),
        path.resolve(process.cwd(), "dist/app/**/*.js"),
        path.resolve(process.cwd(), "dist/features/**/*.js"),
    ],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export { swaggerSpec };