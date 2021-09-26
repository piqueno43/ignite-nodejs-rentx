import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";

import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let dateProvider: DayjsDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProviderInMemory: MailProviderInMemory;

describe("Send forgot Mail", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    mailProviderInMemory = new MailProviderInMemory();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProviderInMemory
    );
  });

  it("should be able to send a forgot password mail to the user", async () => {
    const sendMail = jest.spyOn(mailProviderInMemory, "sendMail");

    await usersRepositoryInMemory.create({
      driver_license: "ABC-1234",
      email: "test@example.com",
      name: "test",
      password: "1234",
    });

    await sendForgotPasswordMailUseCase.execute("test@example.com");

    expect(sendMail).toHaveBeenCalled();
  });

  it("should not be able to send an email if user does not exists!", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("novalid@email.com")
    ).rejects.toEqual(new AppError("User does not exists"));
  });

  it("should be able to create an users token", async () => {
    const generateTokenMail = jest.spyOn(
      usersTokensRepositoryInMemory,
      "create"
    );

    await usersRepositoryInMemory.create({
      driver_license: "ABC-1234",
      email: "test@example.com",
      name: "test",
      password: "1234",
    });

    await sendForgotPasswordMailUseCase.execute("test@example.com");

    expect(generateTokenMail).toBeCalled();
  });
});
