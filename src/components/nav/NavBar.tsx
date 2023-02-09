import { Container } from "../Container";
import { LoginButton } from "./LoginButton";

export function NavBar() {
  return (
    <Container>
      <div className={" flex justify-end"}>
        <LoginButton />
      </div>
    </Container>
  );
}
