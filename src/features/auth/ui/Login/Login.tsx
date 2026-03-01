import { useLoginMutation } from '@/features/auth/api/authApi';
import { Path } from '@/common/routing/paths';

export const Login = () => {
  const [login] = useLoginMutation();
  const loginHandler = () => {
    const redirectUri = `${import.meta.env.VITE_DOMAIN_ADDRESS}${Path.OAuthRedirect}`;
    const url = `${import.meta.env.VITE_BASE_URL}/auth/oauth-redirect?callbackUrl=${redirectUri}`;
    window.open(url, 'oauthPopup', 'width=500, height=600');

    // Функция-обработчик для получения сообщений из всплывающего окна
    const receiveMessage = async (event: MessageEvent) => {
      if (event.origin !== import.meta.env.VITE_DOMAIN_ADDRESS) return;
      const { code } = event.data;
      if (!code) return;

      // Отписываемся от события, чтобы избежать обработки дублирующихся сообщений
      window.removeEventListener('message', receiveMessage);
      login({ code, redirectUri, rememberMe: false });
    };
    window.addEventListener('message', receiveMessage);
  };

  return (
    <button type="button" onClick={loginHandler}>
      Login
    </button>
  );
};
