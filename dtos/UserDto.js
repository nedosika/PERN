class UserDto {
    email;
    id;

    constructor(model) {
        this.email = model.user_email;
        this.id = model.user_id;
    }
}

export default UserDto;