import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando seed do banco de dados...\n");

  // Limpar dados existentes
  console.log("🗑️  Limpando dados antigos...");
  await prisma.clone.deleteMany();
  await prisma.house.deleteMany();
  await prisma.noCloneHouse.deleteMany();
  console.log("✅ Dados antigos removidos\n");

  // Dados das casas com clones
  const houses = [
    {
      name: "Estrelabet",
      url: "https://www.estrelabet.bet.br/",
      status: "ok",
      notes: null,
      clones: [
        {
          name: "Nossabet",
          url: "https://nossa.bet.br/br/",
          status: "ok",
          notes: null,
        },
        {
          name: "JogodeOuro",
          url: "https://jogodeouro.bet.br/pt",
          status: "ok",
          notes: null,
        },
        {
          name: "MCGames",
          url: "https://mcgames.bet.br/",
          status: "ok",
          notes: null,
        },
        {
          name: "Multbet",
          url: "https://multi.bet.br/",
          status: "ok",
          notes: null,
        },
        {
          name: "Aposta1",
          url: "https://aposta1.bet.br",
          status: "ok",
          notes: null,
        },
        {
          name: "Bateubet",
          url: "https://bateu.bet.br/",
          status: "ok",
          notes: null,
        },
        {
          name: "Esportivabet",
          url: "https://esportiva.bet.br",
          status: "ok",
          notes: null,
        },
        {
          name: "Goldebet",
          url: "https://goldebet.bet.br",
          status: "ok",
          notes: null,
        },
        {
          name: "Lotogreen",
          url: "https://lotogreen.bet.br",
          status: "ok",
          notes: null,
        },
        {
          name: "Cassinopix",
          url: "https://cassino.bet.br",
          status: "ok",
          notes: null,
        },
        { name: "Vupi", url: "https://vupi.bet.br", status: "ok", notes: null },
        {
          name: "Betfusion",
          url: "https://betfusion.bet.br",
          status: "ok",
          notes: null,
        },
        {
          name: "Sorteonline",
          url: "https://sorteonline.bet.br",
          status: "ok",
          notes: null,
        },
        {
          name: "Lottoland",
          url: "https://lottoland.bet.br",
          status: "ok",
          notes: null,
        },
        {
          name: "BrasildaSorte",
          url: "https://www.brasildasorte.bet.br/",
          status: "ok",
          notes: null,
        },
        {
          name: "BR4Bet",
          url: "https://br4.bet.br/",
          status: "ok",
          notes: null,
        },
        { name: "UPbet", url: "https://up.bet.br/", status: "ok", notes: null },
        {
          name: "Pagol",
          url: "https://pagol.bet.br/",
          status: "ok",
          notes: null,
        },
        {
          name: "Aviaobet",
          url: "https://aviao.bet.br",
          status: "ok",
          notes: null,
        },
      ],
    },
    {
      name: "Bet7k",
      url: "https://7k.bet.br/",
      status: "ok",
      notes: null,
      clones: [
        {
          name: "MMABET",
          url: "https://mmabet.bet.br/",
          status: "ok",
          notes: null,
        },
        {
          name: "Pixbet",
          url: "https://pix.bet.br/",
          status: "ok",
          notes: null,
        },
        {
          name: "BetdaSorte",
          url: "https://betdasorte.bet.br",
          status: "ok",
          notes: null,
        },
        {
          name: "Betaki",
          url: "https://betaki.bet.br",
          status: "ok",
          notes: null,
        },
        {
          name: "Ricobet",
          url: "https://rico.bet.br",
          status: "ok",
          notes: null,
        },
        {
          name: "BRXBet",
          url: "https://brx.bet.br",
          status: "ok",
          notes: null,
        },
        {
          name: "ApostaMax",
          url: "https://apostamax.bet.br",
          status: "ok",
          notes: null,
        },
        {
          name: "Betgorilas",
          url: "https://betgorillas.bet.br",
          status: "ok",
          notes: null,
        },
        {
          name: "Betbufalos",
          url: "https://betbuffalos.bet.br",
          status: "ok",
          notes: null,
        },
        {
          name: "Betfalcons",
          url: "https://betfalcons.bet.br",
          status: "ok",
          notes: null,
        },
        {
          name: "Apostatudo",
          url: "https://apostatudo.bet.br",
          status: "ok",
          notes: null,
        },
        {
          name: "B1Bet",
          url: "https://b1bet.bet.br",
          status: "ok",
          notes: null,
        },
        {
          name: "Betpontobet",
          url: "https://betpontobet.bet.br",
          status: "ok",
          notes: null,
        },
        {
          name: "Donaldbet",
          url: "https://donald.bet.br",
          status: "ok",
          notes: null,
        },
        {
          name: "Bullsbet",
          url: "https://bullsbet.bet.br",
          status: "ok",
          notes: null,
        },
        {
          name: "Jogaobet",
          url: "https://jogao.bet.br",
          status: "ok",
          notes: null,
        },
        {
          name: "Liderbet",
          url: "https://lider.bet.br",
          status: "ok",
          notes: null,
        },
        {
          name: "B2x.bet",
          url: "https://b2x.bet.br",
          status: "ok",
          notes: null,
        },
        {
          name: "Verabet",
          url: "https://vera.bet.br",
          status: "ok",
          notes: null,
        },
        {
          name: "Sortenabet",
          url: "https://sortenabet.bet.br",
          status: "ok",
          notes: null,
        },
        {
          name: "Betou",
          url: "https://betou.bet.br",
          status: "ok",
          notes: null,
        },
        {
          name: "Kingpanda",
          url: "https://kingpanda.bet.br",
          status: "ok",
          notes: null,
        },
        {
          name: "Icebet",
          url: "https://ice.bet.br/",
          status: "ok",
          notes: null,
        },
        {
          name: "Geralbet",
          url: "https://geralbet.bet.br",
          status: "ok",
          notes: null,
        },
      ],
    },
    {
      name: "Blazer",
      url: "https://blaze.bet.br/pt/",
      status: "ok",
      notes: null,
      clones: [
        {
          name: "BetVip",
          url: "https://betvip.bet.br",
          status: "ok",
          notes: null,
        },
        {
          name: "Jonbet",
          url: "https://jonbet.bet.br",
          status: "ok",
          notes: null,
        },
        { name: "Uxbet", url: "https://ux.bet.br", status: "ok", notes: null },
        {
          name: "Afunbet",
          url: "https://afun.bet.br",
          status: "ok",
          notes: null,
        },
        {
          name: "Ganhei.bet",
          url: "https://ganhei.bet.br",
          status: "ok",
          notes: null,
        },
      ],
    },
    {
      name: "Onabet",
      url: "https://ona.bet.br",
      status: "ok",
      notes: null,
      clones: [
        {
          name: "Esporte365",
          url: "https://esporte365.bet.br/",
          status: "ok",
          notes: null,
        },
        {
          name: "Luck.bet",
          url: "https://luck.bet.br/",
          status: "ok",
          notes: null,
        },
        {
          name: "1praum",
          url: "https://1pra1.bet.br",
          status: "ok",
          notes: null,
        },
        {
          name: "Starbet",
          url: "https://start.bet.br",
          status: "ok",
          notes: null,
        },
        {
          name: "Realsbet",
          url: "https://reals.bet.br",
          status: "ok",
          notes: null,
        },
        {
          name: "Bigbet",
          url: "https://big.bet.br",
          status: "ok",
          notes: null,
        },
        {
          name: "Apostar",
          url: "https://apostar.bet.br",
          status: "ok",
          notes: null,
        },
        {
          name: "Luvabet",
          url: "https://luva.bet.br",
          status: "ok",
          notes: null,
        },
      ],
    },
    {
      name: "Vbet",
      url: "https://vbet.bet.br",
      status: "ok",
      notes: null,
      clones: [
        {
          name: "Bravobet",
          url: "https://bravo.bet.br",
          status: "ok",
          notes: null,
        },
        {
          name: "Supremabet",
          url: "https://suprema.bet.br",
          status: "ok",
          notes: null,
        },
        { name: "H2bet", url: "https://h2.bet.br", status: "ok", notes: null },
        {
          name: "Betpark",
          url: "https://betpark.bet.br",
          status: "ok",
          notes: null,
        },
        {
          name: "Segurobet",
          url: "https://seguro.bet.br",
          status: "ok",
          notes: null,
        },
        {
          name: "7Games",
          url: "https://7games.bet.br",
          status: "ok",
          notes: null,
        },
        {
          name: "Betão",
          url: "https://betao.bet.br",
          status: "ok",
          notes: null,
        },
        { name: "R7.bet", url: "https://r7.bet.br", status: "ok", notes: null },
        {
          name: "Maximabet",
          url: "https://www.maxima.bet.br/",
          status: "ok",
          notes: null,
        },
        {
          name: "Ultrabet",
          url: "https://ultra.bet.br",
          status: "ok",
          notes: null,
        },
      ],
    },
    {
      name: "Betfast",
      url: "https://betfast.bet.br",
      status: "ok",
      notes: null,
      clones: [
        {
          name: "Faz1bet",
          url: "https://faz1.bet.br",
          status: "ok",
          notes: null,
        },
        {
          name: "Tivobet",
          url: "https://tivo.bet.br",
          status: "ok",
          notes: null,
        },
        {
          name: "Ijogo",
          url: "https://ijogo.bet.br",
          status: "ok",
          notes: null,
        },
        { name: "9fbet", url: "https://9f.bet.br", status: "ok", notes: null },
        {
          name: "9d.bet",
          url: "https://9d.bet.br/br/web/sports",
          status: "ok",
          notes: null,
        },
        { name: "6z.bet", url: "https://6z.bet.br", status: "ok", notes: null },
      ],
    },
    {
      name: "Stake",
      url: "https://stake.bet.br",
      status: "ok",
      notes: null,
      clones: [
        {
          name: "BetMGM",
          url: "https://betmgm.bet.br",
          status: "ok",
          notes: null,
        },
        { name: "KTO", url: "https://kto.bet.br", status: "ok", notes: null },
      ],
    },
    {
      name: "Sportingbet",
      url: "https://sportingbet.bet.br",
      status: "ok",
      notes: null,
      clones: [
        {
          name: "Betboo",
          url: "https://betboo.bet.br",
          status: "ok",
          notes: null,
        },
      ],
    },
    {
      name: "Betfair",
      url: "https://www.betfair.bet.br/exchange/plus/",
      status: "ok",
      notes: null,
      clones: [
        {
          name: "Bolsa",
          url: "https://bolsadeaposta.bet.br",
          status: "ok",
          notes: null,
        },
        {
          name: "Fultbet",
          url: "https://fulltbet.bet.br",
          status: "ok",
          notes: null,
        },
        {
          name: "Bet-Bra",
          url: "https://betbra.bet.br",
          status: "ok",
          notes: null,
        },
      ],
    },
  ];

  // Casas sem clones
  const noCloneHouses = [
    { name: "Betnacional", url: "https://www.betnacional.com/" },
    { name: "Superbet", url: "https://www.superbet.com.br/" },
    { name: "Sportybewt", url: "https://www.sportingbet.com/" },
    { name: "Pinnacle", url: "https://www.pinnacle.com/" },
    { name: "Betano", url: "https://www.betano.com.br/" },
    { name: "Novibet", url: "https://www.novibet.com.br/" },
    { name: "Bet365", url: "https://www.bet365.com/" },
    { name: "Rivalo", url: "https://www.rivalo.com/" },
    { name: "Betsson", url: "https://www.betsson.com/" },
    { name: "Betwarrior", url: "https://www.betwarrior.bet/" },
  ];

  // Criar casas e clones
  console.log("🏗️  Criando casas e clones...");
  let totalClones = 0;

  for (const houseData of houses) {
    const { clones, ...houseInfo } = houseData;

    const house = await prisma.house.create({
      data: {
        ...houseInfo,
        clones: {
          create: clones,
        },
      },
      include: {
        clones: true,
      },
    });

    totalClones += house.clones.length;
    console.log(`✅ ${house.name}: ${house.clones.length} clones`);
  }

  // Criar casas sem clones
  console.log("\n🏗️  Criando casas sem clones...");
  for (const houseData of noCloneHouses) {
    await prisma.noCloneHouse.create({
      data: houseData,
    });
    console.log(`✅ ${houseData.name}`);
  }

  console.log("\n🎉 Seed concluído com sucesso!");
  console.log(`📊 Total de casas: ${houses.length}`);
  console.log(`📊 Total de clones: ${totalClones}`);
  console.log(`📊 Total de casas sem clones: ${noCloneHouses.length}`);
}

main()
  .catch((e) => {
    console.error("❌ Erro ao executar seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
