import { Request, Response, NextFunction } from "express"
import { loremIpsum } from "lorem-ipsum";

const index = (req: Request, res: Response) =>{
    res.render('home', {
        mensagem: "Página principal da aplicação",
});
}

const about = (req: Request ,res: Response) =>{
    res.render('sobre', {
        mensagem: "Sobre o projeto:",
    });
}

const welcome = (req: Request ,res: Response) =>{
    res.status(200).send(`Bem vindo, ${req.params.nome}`)
}

const lorem = (req: Request, res: Response) => {
    const qtd = Number(req.params.qtd);

    const loremText = loremIpsum({
        count: qtd,      
        units: 'paragraphs',       
        format: 'html'             
    })

    res.send(loremText);

}

const hb1 = (req: Request, res: Response) => {
    res.render('hb1', {
        mensagem: 'Bem vindo ao projeto do Space Shooter + Backend',
    });
}

const hb2 = (req: Request, res: Response) => {
    res.render('hb2', {
        poweredByNodejs: true,
        name: 'Express',
        type: 'Framework',
        layout: false,
    });
}

const hb3 = (req: Request ,res: Response) => {
    const discs = [
        { nome: "AED2", cg: 90 },
        { nome: "PAA", cg: 60 },
        { nome: "Redes", cg: 90 },
    ]

    const profs = [
        { nome: "David Fernandes", sala: 2338 },
        { nome: "Taynana Uchoa", sala: 2336 },
        { nome: "César Melo", sala: 2330 },
    ]
    
    res.render("hb3", {
        discs,
        profs,
        mensagem: "Bem-vindo(a) ao SpaceShooter Application",
        mostrar_mensagem: true,
    })
}

const hb4 = (req: Request, res: Response) => {
    const technologies = [
        { name: 'Express', type: 'Framework', poweredByNodejs: true },
        { name: 'Laravel', type: 'Framework', poweredByNodejs: false },
        { name: 'React', type: 'Library', poweredByNodejs: true },
        { name: 'Handlebars', type: 'Engine View', poweredByNodejs: true },
        { name: 'Django', type: 'Framework', poweredByNodejs: false },
        { name: 'Docker', type: 'Virtualization', poweredByNodejs: false },
        { name: 'Sequelize', type: 'ORM tool', poweredByNodejs: true },
    ];
    res.render('hb4', { technologies });
}
const testeCookie =(req: Request, res: Response) =>{
    if(!('teste-cookie' in req.cookies)){
        res.cookie('teste-cookie', 'algum valor')
        res.send('Você nunca passou por aqui')
    } else{
        res.send('Você já passou por aqui')
    }
}
export default { index, about, welcome, lorem, hb1, hb2, hb3, hb4, testeCookie}