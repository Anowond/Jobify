export class NotFoundError extends Error {
    constructor(message) {
        super(message)
        this.statusCode = 404
        this.name = 'NotFound'
    }
}

export class BadRequest extends Error {
    constructor(message) {
        super(message)
        this.statusCode = 400
        this.name = 'BadRequest'
    }
}

export class Unauthorized extends Error {
    constructor(message) {
        super(message)
        this.statusCode = 401
        this.name = 'Unauthorized'
    }
}

export class Forbidden extends Error {
    constructor(message) {
        super(message)
        this.statusCode = 403
        this.name = 'Forbidden'
    }
}

export class Conflict extends Error {
    constructor(message) {
        super(message)
        this.statusCode = 409
        this.name = 'Conflict'
    }
}
