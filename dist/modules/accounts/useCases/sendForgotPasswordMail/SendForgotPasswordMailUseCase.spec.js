"use strict";

var _UsersRepositoryInMemory = require("../../repositories/in-memory/UsersRepositoryInMemory");

var _UsersTokensRepositoryInMemory = require("../../repositories/in-memory/UsersTokensRepositoryInMemory");

var _DayjsDateProvider = require("../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider");

var _MailProviderInMemory = require("../../../../shared/container/providers/MailProvider/in-memory/MailProviderInMemory");

var _AppError = require("../../../../shared/errors/AppError");

var _SendForgotPasswordMailUseCase = require("./SendForgotPasswordMailUseCase");

let usersRepositoryInMemory;
let sendForgotPasswordMailUseCase;
let dateProvider;
let usersTokensRepositoryInMemory;
let mailProviderInMemory;
describe("Send forgot Mail", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new _UsersRepositoryInMemory.UsersRepositoryInMemory();
    dateProvider = new _DayjsDateProvider.DayjsDateProvider();
    usersTokensRepositoryInMemory = new _UsersTokensRepositoryInMemory.UsersTokensRepositoryInMemory();
    mailProviderInMemory = new _MailProviderInMemory.MailProviderInMemory();
    sendForgotPasswordMailUseCase = new _SendForgotPasswordMailUseCase.SendForgotPasswordMailUseCase(usersRepositoryInMemory, usersTokensRepositoryInMemory, dateProvider, mailProviderInMemory);
  });
  it("should be able to send a forgot password mail to the user", async () => {
    const sendMail = jest.spyOn(mailProviderInMemory, "sendMail");
    await usersRepositoryInMemory.create({
      driver_license: "ABC-1234",
      email: "test@example.com",
      name: "test",
      password: "1234"
    });
    await sendForgotPasswordMailUseCase.execute("test@example.com");
    expect(sendMail).toHaveBeenCalled();
  });
  it("should not be able to send an email if user does not exists!", async () => {
    await expect(sendForgotPasswordMailUseCase.execute("novalid@email.com")).rejects.toEqual(new _AppError.AppError("User does not exists"));
  });
  it("should be able to create an users token", async () => {
    const generateTokenMail = jest.spyOn(usersTokensRepositoryInMemory, "create");
    await usersRepositoryInMemory.create({
      driver_license: "ABC-1234",
      email: "test@example.com",
      name: "test",
      password: "1234"
    });
    await sendForgotPasswordMailUseCase.execute("test@example.com");
    expect(generateTokenMail).toBeCalled();
  });
});