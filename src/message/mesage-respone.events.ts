import { Message } from "discord.js";
import { generateRandomDateInBoundaries } from "../utils/random-generators";
import { IMessageEvent, MessageEventName } from "../models/jakal-message-event.model";

export const thumbsUpEvent = {
  key: 'ThumbsUp',
  execute: (message: Message) => { message.react("👍") },
  timeoutMs: 0,
} as IMessageEvent

export const notasEvent = {
  key: 'Notas',
  execute: (message: Message) => { message.channel.send("Chlapi, neviděl někdo z vás můj notebook?") },
  timeoutMs: 5000,
} as IMessageEvent

export const toPoznasEvent = {
  key: 'ToPoznas',
  execute: (message: Message<boolean>) => {
    message.channel.send(
      `Taky bych ${message.content}, ale to poznáš až budeš mít děti`
    );
  },
  timeoutMs: 0,
} as IMessageEvent

export const distinctEvent = {
  key: 'Distinct',
  execute: (message: Message<boolean>) => {
    message.channel.send("Distinct vrací unikátní záznamy");
  },
  timeoutMs: 0,
} as IMessageEvent


export const alriightEvent = {
  key: 'Alriight',
  execute: (message: Message<boolean>) => {
    message.channel.send(`Alriiiight, guuuys`);
  },
  timeoutMs: 60000,
} as IMessageEvent

export const redflagEvent = {
  key: 'Redflag',
  execute: (message: Message<boolean>) => {
    message.channel.send(`Redflag! `);
    message.channel.send(
      `Podle mě se ${message.content} nehodi. Ale finalni volba je na vás bando. 😉`
    );
  },
  timeoutMs: 0,
} as IMessageEvent

export const skvelaPraceEvent = {
  key: 'SkvelaPrace',
  execute: (message: Message<boolean>) => {
    message.channel.send(`Skvělá práce borci dneska!`);
  },
  timeoutMs: 10000,
} as IMessageEvent


const naDovolene = (message: Message<boolean>) => {
  const dateNow = new Date();
  const initialDate = new Date("11-09-2017");
  const randomDate = generateRandomDateInBoundaries(initialDate, dateNow)

  const [year, month, day] = [randomDate.getFullYear().toString().padStart(2, "0"), (randomDate.getMonth() + 1).toString().padStart(2, "0"), randomDate.getDate().toString().padStart(2, "0")];
  const url = `https://cdn6.babeherder.com/repo-0002/babes/${year}/${month}/${day}/mozaic.jpg`

  message.channel.send({
    files: [url]
  });
  message.channel.send(`Tady je moje žena na dovolené, jak jsme byli spolu, než se narodila dcera. Pak se všechno posralo.`)
}

export const naDovoleneEvent = {
  key: 'NaDovolene',
  execute: naDovolene,
  timeoutMs: 0,
} as IMessageEvent

export const judoEvent = {
  key: 'Judo',
  execute: (message: Message<boolean>) => {
    message.channel.send(`Včera jsem byl s Matym na judu.😉`)
  },
  timeoutMs: 30000,
} as IMessageEvent


const tichuckoCondition = (message: Message<boolean>) => {
  const messageContent = message.content.toLocaleLowerCase();
  const containsDrz = messageContent.indexOf('drz') > -1 || messageContent.indexOf('drž') > -1
  const containsPicuHubu = messageContent.indexOf('hubu') > -1 || messageContent.indexOf('picu') > -1 || messageContent.indexOf('piču') > -1
  const kokote = messageContent.indexOf('kokote') > -1
  return ((containsDrz && containsPicuHubu) || kokote);

}
export const tichuckoEvent = {
  key: 'Tichucko',
  executeCondition: tichuckoCondition,
  execute: (message: Message<boolean>) => {
    message.channel.send("Ale ja to dělal schválně, aby jste pochopili, že to je špatně!")
  },
  timeoutMs: 0,
} as IMessageEvent

const nahlasuckoCondition = (message: Message) => message.mentions.members?.has(message.client.user?.id) || message.content.toLocaleLowerCase().indexOf('jakal') > -1
export const nahlasuckoEvent = {
  key: 'Nahlasucko',
  executeCondition: nahlasuckoCondition,
  execute: () => null,
  timeoutMs: 0,
} as IMessageEvent

export const urgoEvent = {
  key: 'Urgo',
  executeCondition: (message: Message) => message.content.indexOf("backlog") > -1,
  execute: (message: Message<boolean>) => {
    message.channel.send(
      `Okey a mam to nějak urgovat? Bando? Ještě nějak jak s tim mužu pomoct?`
    );
  },
  timeoutMs: 0,
} as IMessageEvent

export const jakDlouhoVydrziEvent = {
  key: 'JakDlouho',
  executeCondition: (message: Message) => message.content.indexOf("vydrz") > -1 || message.content.indexOf("vydrž") > -1,
  execute: (message: Message<boolean>) => {
    message.channel.send(
      `No většinou do roka- víc tady člověk na projektu nevydrží.`
    );
  },
  timeoutMs: 0,
} as IMessageEvent

export const ehrmanEvent = {
  key: 'Ehrman',
  executeCondition: (message: Message) => message.content.indexOf("hrman") > -1,
  execute: (message: Message<boolean>) => {
    message.channel.send(`To u nas není, to už se neprodává, to mají jenom v Polsku. 😉`)
  },
  timeoutMs: 30000,
} as IMessageEvent

export const prajzkaEvent = {
  key: 'Prajzska',
  executeCondition: (message: Message) => message.content.indexOf("praj") > -1,
  execute: (message: Message<boolean>) => {
    message.channel.send(`Hlučín není prajzská. To vím jsem tam bydlel. 😉`)
  },
  timeoutMs: 30000,
} as IMessageEvent

export const byloEvent = {
  key: 'Bylo',
  executeCondition: (message: Message) => {
    return message.content.indexOf("bylo") > -1 && Math.random() > 0.5
  },
  execute: (message: Message<boolean>) => {
    message.channel.send(`Za mě to tak nebylo. 😉`)
  },
  timeoutMs: 30000,
} as IMessageEvent

export const actionPointEvent = {
  key: 'ActionPoint',
  executeCondition: (message: Message) => {
    return message.content.indexOf("?") > -1 && Math.random() > 0.3
  },
  execute: (message: Message<boolean>) => {
    message.channel.send(`Bando- vidím, že kolem toho je ještě spoustu otázek. Udělám tedy z "${message}" action point. 😉`)
  },
  timeoutMs: 30000,
} as IMessageEvent

export const daSa1Event = {
  key: 'DaSa1',
  executeCondition: (message: Message) => {
    return (message.content.toLocaleLowerCase().indexOf("da") > -1 || message.content.toLocaleLowerCase().indexOf("dá") > -1) && Math.random() > 0
  },
  nextEvent: 'DaSa2',
  execute: (message: Message<boolean>) => {
    message.channel.send(`Dá sa, nedá sa, dá sa Pražákom.`)
  },
  timeoutMs: 10000,
} as IMessageEvent

export const daSa2Event = {
  key: 'DaSa2',
  execute: (message: Message<boolean>) => {
    message.channel.send(`Bára se nesměje.`)
  },
  timeoutMs: 10000,
} as IMessageEvent

const toJeDomluva = (message: Message) => { message.channel.send(`To je domluva...`) };

export const jakSeJmenoval1Event = {
  key: 'JakSeJmenoval1',
  nextEvent: 'JakSeJmenoval2',
  execute: (message: Message<boolean>) => {
    message.channel.send(`Jak se jmenoval ten manažer, kterého jsi potkal?`)
  },
  timeoutMs: 20000,
  isEvaluatedIndividually: true,
} as IMessageEvent

export const jakSeJmenoval2Event = {
  key: 'JakSeJmenoval2',
  evaluateNextEventCondition: (message: Message) => !!message,
  nextEvent: 'JakSeJmenoval3',
  execute: (message: Message<boolean>) => {
    message.channel.send(`Karel?`)
  },
  timeoutMs: 20000,
  isEvaluatedIndividually: true,
} as IMessageEvent

export const jakSeJmenoval3Event = {
  key: 'JakSeJmenoval3',
  nextEvent: 'JakSeJmenoval4',
  evaluateNextEventCondition: (message: Message) => !!message,
  timeoutExecution: (message: Message) => {},
  execute: (message: Message<boolean>) => {
    message.channel.send(`Petr?`)
  },
  timeoutMs: 20000,
  isEvaluatedIndividually: true,
} as IMessageEvent

export const jakSeJmenoval4Event = {
  key: 'JakSeJmenoval4',
  nextEvent: 'JakSeJmenoval5',
  evaluateNextEventCondition: (message: Message) => !!message,
  timeoutExecution: (message: Message) => {},
  execute: (message: Message<boolean>) => {
    message.channel.send(`Pavel?`)
  },
  timeoutMs: 20000,
  isEvaluatedIndividually: true,
} as IMessageEvent

export const jakSeJmenoval5Event = {
  key: 'JakSeJmenoval5',
  nextEvent: 'JakSeJmenoval6',
  evaluateNextEventCondition: (message: Message) => !!message,
  timeoutExecution: (message: Message) => {},
  execute: (message: Message<boolean>) => {
    message.channel.send(`Filip?`)
  },
  timeoutMs: 10000,
  isEvaluatedIndividually: true,
} as IMessageEvent

export const jakSeJmenoval6Event = {
  key: 'JakSeJmenoval6',
  nextEvent: 'JakSeJmenoval7',
  evaluateNextEventCondition: (message: Message) => !!message,
  timeoutExecution: (message: Message) => {},
  execute: (message: Message<boolean>) => {
    message.channel.send(`Luboš?`)
  },
  timeoutMs: 20000,
  isEvaluatedIndividually: true,
} as IMessageEvent

export const jakSeJmenoval7Event = {
  key: 'JakSeJmenoval7',
  nextEvent: 'JakSeJmenoval8',
  evaluateNextEventCondition: (message: Message) => !!message,
  timeoutExecution: (message: Message) => {},
  execute: (message: Message<boolean>) => {
    message.channel.send(`Jára?`)
  },
  timeoutMs: 20000,
  isEvaluatedIndividually: true,
} as IMessageEvent

export const jakSeJmenoval8Event = {
  key: 'JakSeJmenoval8',
  nextEvent: 'JakSeJmenoval9',
  evaluateNextEventCondition: (message: Message) => !!message,
  timeoutExecution: (message: Message) => {},
  execute: (message: Message<boolean>) => {
    message.channel.send(`David?`)
  },
  timeoutMs: 20000,
  isEvaluatedIndividually: true,
} as IMessageEvent

export const jakSeJmenoval9Event = {
  key: 'JakSeJmenoval9',
  nextEvent: 'JakSeJmenoval10',
  evaluateNextEventCondition: (message: Message) => !!message,
  timeoutExecution: (message: Message) => {},
  execute: (message: Message<boolean>) => {
    message.channel.send(`Michal?`)
  },
  timeoutMs: 20000,
  isEvaluatedIndividually: true,
} as IMessageEvent

export const jakSeJmenoval10Event = {
  key: 'JakSeJmenoval10',
  nextEvent: 'JakSeJmenoval11',
  evaluateNextEventCondition: (message: Message) => !!message,
  timeoutExecution: (message: Message) => {},
  execute: (message: Message<boolean>) => {
    message.channel.send(`Tarek?`)
  },
  timeoutMs: 20000,
  isEvaluatedIndividually: true,
} as IMessageEvent

export const jakSeJmenoval11Event = {
  key: 'JakSeJmenoval11',
  nextEvent: 'JakSeJmenoval12',
  evaluateNextEventCondition: (message: Message) => !!message,
  timeoutExecution: (message: Message) => {},
  execute: (message: Message<boolean>) => {
    message.channel.send(`Jindřich?`)
  },
  timeoutMs: 20000,
  isEvaluatedIndividually: true,
} as IMessageEvent

export const jakSeJmenoval12Event = {
  key: 'JakSeJmenoval12',
  nextEvent: 'JakSeJmenoval3',
  evaluateNextEventCondition: (message: Message) => !!message,
  timeoutExecution: (message: Message) => {},
  execute: (message: Message<boolean>) => {
    message.channel.send(`Mečislav?`)
  },
  timeoutMs: 20000,
  isEvaluatedIndividually: true,
} as IMessageEvent

export const jakSeJmenoval13Event = {
  key: 'JakSeJmenoval13',
  nextEvent: 'JakSeJmenoval14',
  evaluateNextEventCondition: (message: Message) => !!message,
  timeoutExecution: (message: Message) => {},
  execute: (message: Message<boolean>) => {
    message.channel.send(`Ctirad?`)
  },
  timeoutMs: 20000,
  isEvaluatedIndividually: true,
} as IMessageEvent

export const jakSeJmenoval14Event = {
  key: 'JakSeJmenoval14',
  evaluateNextEventCondition: (message: Message) => !!message,
  timeoutExecution: (message: Message) => {},
  execute: (message: Message<boolean>) => {
    message.channel.send(`Kazimír?`)
  },
  timeoutMs: 20000,
  isEvaluatedIndividually: true,
} as IMessageEvent

export const naStojaka1Event = {
  key: 'NaStojaka1',
  nextEvent: 'NaStojaka2',
  execute: (message: Message<boolean>) => {
    message.channel.send(`Radku?`)
  },
  timeoutMs: 10000,
} as IMessageEvent

export const naStojaka2Event = {
  key: 'NaStojaka2',
  evaluateNextEventCondition: (message: Message) => message.author.id == '539974505087369226',
  nextEvent: 'NaStojaka3',
  execute: (message: Message<boolean>) => {
    message.channel.send(`Hej, Radku?`)
  },
  timeoutMs: 15000,
} as IMessageEvent

export const naStojaka3Event = {
  key: 'NaStojaka3',
  evaluateNextEventCondition: (message: Message) => message.author.id == '539974505087369226',
  timeoutExecution: toJeDomluva,
  execute: (message: Message<boolean>) => {
    message.channel.send(`Na stojáka? 😉`)
  },
  timeoutMs: 20000,
} as IMessageEvent
