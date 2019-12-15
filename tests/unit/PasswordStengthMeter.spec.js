import { mount } from "@vue/test-utils";
import PasswordStengthMeter from "@/components/PasswordStengthMeter.vue";

import zxcvbn from "zxcvbn";

jest.mock("zxcvbn");

describe("PasswordStengthMeter.vue", () => {
  let wrapper;

  function createComponent(props = {}, methods = {}) {
    wrapper = mount(PasswordStengthMeter, {
      propsData: { ...props },
      methods: {
        ...methods
      }
    });
  }

  beforeEach(() => {
    zxcvbn.mockImplementation(() => {
      return jest.fn().mockImplementation(() => {
        return { score: 1, feedback: "Feedback" };
      });
    });

    createComponent({ password: "12345623444" });
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  it("has a mounted hook", () => {
    expect(typeof PasswordStengthMeter.mounted).toBe("function");
  });

  it("should call onPasswordChange on mounted", () => {
    const onPasswordChangeSpy = jest.fn();
    createComponent(
      { password: "123456" },
      { onPasswordChange: onPasswordChangeSpy }
    );

    expect(onPasswordChangeSpy).toHaveBeenCalled();
  });

  it("should call onPasswordChange on password change", () => {
    jest.spyOn(wrapper.vm, "onPasswordChange");
    wrapper.setProps({ password: "asdasd" });
    expect(wrapper.vm.onPasswordChange).toHaveBeenCalled();
  });

  it("should set passwordStrength as null on empty password", () => {
    wrapper.setProps({ password: "" });
    expect(wrapper.vm.passwordStrength).toBeNull();
  });

  it("should set passwordStrength as 0 on not meeting min length criteria", () => {
    wrapper.setProps({ password: "123444" });
    expect(wrapper.vm.passwordStrength).toBe(0);
  });

  it("should set passwordStrength as 3", () => {
    jest.spyOn(wrapper.vm, "score").mockReturnValue(3);
    wrapper.setProps({ password: "1234442342343" });
    expect(wrapper.vm.passwordStrength).toBe(3);
    expect(wrapper.vm.feedback).toBeNull();
  });

  it("should set passwordStrength with feedback", () => {
    jest
      .spyOn(wrapper.vm, "scoreWithFeedback")
      .mockReturnValue({ score: 2, feedback: "Bla Bla" });
    wrapper.setProps({ enableFeedback: true, password: "1234442342343" });
    expect(wrapper.vm.passwordStrength).toBe(2);
    expect(wrapper.vm.feedback).toBe("Bla Bla");
  });

  it("should return the appropriate color", async () => {
    jest.spyOn(wrapper.vm, "score").mockReturnValue(3);
    wrapper.setProps({ password: "dadasdsadad" });
    wrapper.vm.onPasswordChange();
    expect(wrapper.vm.meterColor).toBe("yellowgreen");
  });

  it("should update the strength attribute", async () => {
    jest.spyOn(wrapper.vm, "score").mockReturnValue(3);
    wrapper.setProps({ password: "dadasdsadad" });
    wrapper.vm.onPasswordChange();
    expect(
      wrapper.find(".strength-meter-fill").attributes("data-strength")
    ).toBe("3");
  });
});
