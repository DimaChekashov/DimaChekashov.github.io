import { Button } from "@/shared/ui/Button/Button";
import { useTranslations } from "next-intl";

export default function HomePage() {
  const t = useTranslations("HomePage");

  return (
    <div>
      <div>
        <div>
          <div className="w-40 h-40 bg-amber-400 rounded-xl"></div>
        </div>
        <div>
          <h2>Привет, я Дмитрий Чекашов</h2>
          <h3>
            <span>Frontend</span> + <span>Backend</span> разработчик
          </h3>
          <p>Я разрабатываю красивые интерфейсы и производительные системы</p>
          <div>
            <Button>Контакты</Button>
            <Button>Проекты</Button>
          </div>
        </div>
      </div>
      {/* <h1>{t("title")}</h1> */}
    </div>
  );
}
