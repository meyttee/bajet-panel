"use server";
import { cookies } from "next/headers";

async function setCookie(
  key: string,
  value: string,
  maxAge?: number,
  domain?: string,
) {
  const cookie = cookies();
  (await cookie).set(key, value, { maxAge, domain });
  return true;
}

async function removeCookie(key: string) {
  const cookie = cookies();
  (await cookie).delete(key);
  return true;
}

async function getCookie(key: string): Promise<string | undefined> {
  const cookie = cookies();
  return (await cookie).get(key)?.value;
}
