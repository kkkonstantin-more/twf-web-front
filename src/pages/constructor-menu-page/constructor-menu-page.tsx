import React, { useEffect, useState } from "react";
// hooks
import { Link, useHistory, useParams } from "react-router-dom";
// components
import AppModalComponent from "../../copmonents/app-modal/app-modal.component";
// icons
import Icon from "@mdi/react";
import { mdiPencil, mdiPlus } from "@mdi/js";
// styles
import "./constructor-menu-page.scss";
import { mockNamespaces } from "../../constructors/namespace-constructor/namespace-constructor.mock-data";
import { mockRulePacks } from "../../constructors/rule-pack-constructor/rule-pack-constructor.mock-data";
import SelectConstructorItemList from "../../copmonents/select-constructor-item-list/select-constructor-item-list.component";
import { SelectConstructorItemListItem } from "../../copmonents/select-constructor-item-list/select-constructor-item-list.types";
import { mockTaskSets } from "../../constructors/task-set-constructor/task-set-constructor.mock-data";

interface ConstructorMenuBlockProps {
  title: string;
  titleIconUrl: string;
  options: { name: string; action: () => any }[];
}

const ConstructorMenuBlock: React.FC<ConstructorMenuBlockProps> = ({
  title,
  titleIconUrl,
  options,
}: ConstructorMenuBlockProps) => {
  return (
    <div className="constructor-menu-block">
      <div className="constructor-menu-block__title">
        <Icon path={titleIconUrl} size={2} className="u-mr-sm" />
        <h1>{title}</h1>
      </div>
      <div className="constructor-menu-block__options">
        {options.map(
          (option: { name: string; action: () => any }, i: number) => {
            return (
              <div
                key={i}
                className="constructor-menu-block__option"
                onClick={(): any => option.action()}
              >
                {option.name}
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export const demoList = [
  "Alison Park",
  "Jackson Berger",
  "Keri Dawson",
  "Eva Gilbert",
  "Michael Edwards",
  "Delores Salazar",
  "Etta Tyson",
  "Nita Herrera",
  "Fields Chavez",
  "Aurelia Knapp",
  "Patel Hatfield",
  "Blackwell Gilmore",
  "Randolph Mayo",
  "Maureen Romero",
  "Elva Hopkins",
  "Allyson Sloan",
  "Jeri Grimes",
  "Myrtle Willis",
  "Mclean Hodges",
  "Lana Hayes",
];

export const usersDemoList = demoList.map((item: string) => ({
  label: item,
  value: item,
}));

type Tab = "taskSet" | "namespace" | "rulePack";

const ConstructorMenuPage: React.FC = () => {
  const tabs: Tab[] = ["taskSet", "namespace", "rulePack"];
  const { activeTab } = useParams();
  const [currentTab, setCurrentTab] = useState<Tab>(tabs[0]);
  const [showAllItemsModal, setShowAllItemsModal] = useState(false);
  const history = useHistory();
  const [items, setItems] = useState<SelectConstructorItemListItem[]>([]);

  useEffect(() => {
    if (activeTab && tabs.includes(activeTab)) {
      setCurrentTab(activeTab);
    }
  }, [activeTab]);

  const gameBlocks: ConstructorMenuBlockProps[] = [
    {
      title: "Создать новый набор задач",
      titleIconUrl: mdiPlus,
      options: [
        {
          name: "С нуля",
          action: () => history.push("/task-set-constructor"),
        },
        {
          name: "На основе уже существующей",
          action: () => {
            setItems(
              Object.keys(mockTaskSets).map(
                (code: string): SelectConstructorItemListItem => {
                  const { nameRu, namespace } = mockTaskSets[code];
                  return {
                    name: nameRu,
                    code,
                    namespace,
                    onClickAction: () => {
                      history.push("/task-set-constructor/" + code);
                    },
                  };
                }
              )
            );
            setShowAllItemsModal(true);
          },
        },
      ],
    },
    {
      title: "Редактировать мои наборы задач",
      titleIconUrl: mdiPencil,
      options: [
        {
          name: mockTaskSets[3].nameRu,
          action: () => history.push("/task-set-constructor/3"),
        },
        {
          name: mockTaskSets[2].nameRu,
          action: () => history.push("/task-set-constructor/2"),
        },
        {
          name: mockTaskSets[1].nameRu,
          action: () => history.push("/task-set-constructor/1"),
        },
        {
          name: "Смотреть все",
          action: () => {
            setItems(
              Object.keys(mockTaskSets).map(
                (code: string): SelectConstructorItemListItem => {
                  const { nameRu, namespace } = mockTaskSets[code];
                  return {
                    name: nameRu,
                    code,
                    namespace,
                    onClickAction: () => {
                      history.push("/task-set-constructor/" + code);
                    },
                  };
                }
              )
            );
            setShowAllItemsModal(true);
          },
        },
      ],
    },
  ];

  const gameSpaceBlocks: ConstructorMenuBlockProps[] = [
    {
      title: "Создать новый Namespace",
      titleIconUrl: mdiPlus,
      options: [
        {
          name: "С нуля",
          action: () => history.push("/namespace-constructor"),
        },
        {
          name: "На основе уже существующего",
          action: () => {
            setItems(
              Object.keys(mockNamespaces).map((code: string) => {
                const { nameRu } = mockNamespaces[code];
                return {
                  code,
                  name: nameRu,
                  onClickAction: () => {
                    history.push("/namespace-constructor/" + code);
                  },
                };
              })
            );
            setShowAllItemsModal(true);
          },
        },
      ],
    },
    {
      title: "Редактировать существующий Namespace",
      titleIconUrl: mdiPencil,
      options: [
        {
          name: mockNamespaces[3].nameRu,
          action: () => history.push("/namespace-constructor/3"),
        },
        {
          name: mockNamespaces[2].nameRu,
          action: () => history.push("/namespace-constructor/2"),
        },
        {
          name: mockNamespaces[1].nameRu,
          action: () => history.push("/namespace-constructor/1"),
        },
        {
          name: "Смотреть все",
          action: () => {
            setItems(
              Object.keys(mockNamespaces).map((code: string) => {
                const { nameRu } = mockNamespaces[code];
                return {
                  code,
                  name: nameRu,
                  onClickAction: () => {
                    history.push("/namespace-constructor/" + code);
                  },
                };
              })
            );
            setShowAllItemsModal(true);
          },
        },
      ],
    },
  ];

  const rulePacksBlocks: ConstructorMenuBlockProps[] = [
    {
      title: "Создать новый пакет правил",
      titleIconUrl: mdiPlus,
      options: [
        {
          name: "С нуля",
          action: () => history.push("/rule-pack-constructor"),
        },
        {
          name: "На основе уже существующего",
          action: () => {
            setItems(
              Object.keys(mockRulePacks).map((code: string) => {
                const { nameRu, namespace } = mockRulePacks[code];

                return {
                  code,
                  name: nameRu,
                  namespace,
                  onClickAction: (): void => {
                    history.push("/rule-pack-constructor/" + code);
                  },
                };
              })
            );
            setShowAllItemsModal(true);
          },
        },
      ],
    },
    {
      title: "Редактировать существующий пакет правил",
      titleIconUrl: mdiPencil,
      options: [
        {
          name: mockRulePacks[3].nameRu,
          action: () => history.push("/rule-pack-constructor/3"),
        },
        {
          name: mockRulePacks[2].nameRu,
          action: () => history.push("/rule-pack-constructor/2"),
        },
        {
          name: mockRulePacks[1].nameRu,
          action: () => history.push("/rule-pack-constructor/1"),
        },
        {
          name: "Смотреть все",
          action: () => {
            setItems(
              Object.keys(mockRulePacks).map((code: string) => {
                const { nameRu, namespace } = mockRulePacks[code];

                return {
                  code,
                  name: nameRu,
                  namespace,
                  onClickAction: (): void => {
                    history.push("/rule-pack-constructor/" + code);
                  },
                };
              })
            );
            setShowAllItemsModal(true);
          },
        },
      ],
    },
  ];

  return (
    <div className="constructor-menu-page">
      <ul className="constructor-menu-page__tabs">
        <li
          className={`constructor-menu-page__tab ${
            currentTab === tabs[0] && "constructor-menu-page__tab--active"
          }`}
          onClick={() => history.push("/constructor-menu/" + tabs[0])}
        >
          Наборы задач
        </li>
        <li
          className={`constructor-menu-page__tab ${
            currentTab === tabs[1] && "constructor-menu-page__tab--active"
          }`}
          onClick={() => history.push("/constructor-menu/" + tabs[1])}
        >
          Namespaces
        </li>
        <li
          className={`constructor-menu-page__tab ${
            currentTab === tabs[2] && "constructor-menu-page__tab--active"
          }`}
          onClick={() => history.push("/constructor-menu/" + tabs[2])}
        >
          Пакеты Правил
        </li>
      </ul>
      {currentTab === tabs[0] &&
        gameBlocks.map((block: ConstructorMenuBlockProps, i: number) => {
          return <ConstructorMenuBlock key={i} {...block} />;
        })}
      {currentTab === tabs[1] &&
        gameSpaceBlocks.map((block: ConstructorMenuBlockProps, i: number) => {
          return <ConstructorMenuBlock key={i} {...block} />;
        })}
      {currentTab === tabs[2] &&
        rulePacksBlocks.map((block: ConstructorMenuBlockProps, i: number) => {
          return <ConstructorMenuBlock key={i} {...block} />;
        })}
      <AppModalComponent
        isOpen={showAllItemsModal}
        close={() => setShowAllItemsModal(false)}
        width="50%"
        height="70%"
      >
        <SelectConstructorItemList items={items} />
      </AppModalComponent>
    </div>
  );
};

export default ConstructorMenuPage;
