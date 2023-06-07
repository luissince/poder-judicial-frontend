import Menu from "./widget/Menu";
import ListMenu from "./widget/ListMenu";
import Title from "./widget/Title";
import SubTitle from "./widget/SubTitle";
import Overlay from "./widget/Overlay";
import Body from "./widget/Body";
import Estudiante from "../../../../model/interfaces/estudiante.model.interface";
import Trabajador from "../../../../model/interfaces/trabajador.model.interface";

type Props = {
    informacion: Estudiante | Trabajador | undefined,
    pathname: string,
    refAside: React.RefObject<HTMLInputElement>,
    refOverlay: React.RefObject<HTMLInputElement>,
    onEventOverlay: React.MouseEventHandler,
}

type MenuItem = {
    id: string,
    nombre: string,
    pathname?: string,
    icon: string,
    subMenus?: MenuItem[]
}

const menus: MenuItem[] = [
    {
        id: "1",
        nombre: "Dashboard",
        pathname: "/inicio/dashboard",
        icon : "bi-speedometer",
        subMenus: []
    },
    {
        id: "2",
        nombre: "Centro de Ayuda",
        icon : "bi-arrow-left-right",
        subMenus: [
            {
                id: "21",
                pathname: "/inicio/centroayuda/p-frecuente",
                icon : "bi-dash",
                nombre: "P. Frecuente",
            },
            {
                id: "22",
                pathname: "/inicio/centroayuda/consultas",
                icon : "bi-dash",
                nombre: "Consultas",
            }
        ]
    },
    // {
    //     id: "3",
    //     nombre: "Segundo",
    //     pathname: "/inicio/control",
    //     subMenus: []
    // },
    // {
    //     id: "4",
    //     nombre: "Lista 2",
    //     subMenus: [
    //         {
    //             id: "41",
    //             pathname: "#",
    //             nombre: "Sub Menu 2",
    //         }
    //     ]
    // },
    // {
    //     id: "5",
    //     nombre: "Lista 3",
    //     subMenus: [
    //         {
    //             id: "51",
    //             pathname: "#",
    //             nombre: "Sub Menu 2",
    //         }
    //     ]
    // },
    // {
    //     id: "6",
    //     nombre: "Reporte",
    //     pathname: "/inicio/reporte",
    //     subMenus: []
    // },
];


const Aside = (props: Props) => {

    return (
        <Body refAside={props.refAside}>
            <div className="relative z-30 h-full overflow-y-auto py-4">
                <Title />

                <SubTitle informacion={props.informacion} />

                <ul id="menus">
                    {
                        menus.map((menu, index) => {
                            if (menu.subMenus?.length == 0) {
                                return <Menu
                                    key={index}
                                    pathname={props.pathname}
                                    icon={menu.icon}
                                    nombre={menu.nombre}
                                    to={menu.pathname!}
                                />
                            } else {
                                return <ListMenu
                                    key={index}
                                    idList={menu.id}
                                    desplegar={menu.subMenus?.filter(item => item.pathname === props.pathname).length != 0}
                                    icon={menu.icon}
                                    nombre={menu.nombre}
                                >
                                    {
                                        menu.subMenus?.map((submenu, indexm) => {
                                            return <Menu
                                                key={indexm}
                                                pathname={props.pathname}
                                                icon={submenu.icon}
                                                nombre={submenu.nombre}
                                                to={submenu.pathname!}
                                            />
                                        })
                                    }
                                </ListMenu>
                            }
                        })
                    }
                </ul>
            </div>
            <Overlay refOverlay={props.refOverlay} onEventOverlay={props.onEventOverlay} />
        </Body>
    );
}

export default Aside;