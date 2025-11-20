// ============================
// FILTRO DO MENU
// ============================

const menuButtons = document.querySelectorAll('.menu-options button');
const items = document.querySelectorAll('.cardapio .item');

menuButtons.forEach(button => {
  button.addEventListener('click', () => {
    menuButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const filter = button.dataset.filter;

    items.forEach(item => {
      if (filter === 'all' || item.dataset.category === filter) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    });
  });
});


// ============================
// CARRINHO
// ============================

const carrinhoContainer = document.querySelector(".carrinho-container");
const carrinhoNavButton = document.getElementById("cart-button");
const carrinhoX = document.querySelector(".carrinho-x");
const carrinhoVazio = document.querySelector(".carrinho-vazio");
const carrinhoCheio = document.querySelector(".carrinho-cheio");
const adicionarItemButtons = document.querySelectorAll(".btn-adicionar");
const navButtonFloatNumber = document.getElementById("cart-itens-number");
const carrinho = document.getElementById("carrinho-itens-lista");
const itensContainer = document.querySelector(".item-list");
const totalP = document.getElementById("totalP");
const totalItens = document.querySelector(".totalItens");

let carrinhoTotalPrice = 0;
let carrinhoItensNumber = 0;

const carrinhoTotalNumberDisplay = document.getElementById("total-number");
carrinhoTotalNumberDisplay.textContent = carrinhoTotalPrice.toFixed(2);
const totalItemPrice = document.getElementById("totalItemPrice");
totalItemPrice.textContent = carrinhoTotalPrice.toFixed(2);
const totalItemAmout = document.getElementById("totalItemAmout");


// ============================
// ABRIR/FECHAR CARRINHO
// ============================

function abrirCarrinho() {
  carrinhoContainer.style.display = "flex";

  if (carrinhoItensNumber <= 0) {
    carrinhoVazio.style.display = "flex";
    carrinhoCheio.style.display = "none";
    itensContainer.style.display = "none";
  } else {
    carrinhoVazio.style.display = "none";
    carrinhoCheio.style.display = "flex";
    itensContainer.style.display = "flex";
  }
}

function fecharCarrinho() {
  carrinhoContainer.style.display = "none";
}

carrinhoNavButton.addEventListener("click", abrirCarrinho);
totalItens.addEventListener("click", abrirCarrinho);

carrinhoContainer.addEventListener("click", (e) => {
  if (e.target === carrinhoContainer || e.target === carrinhoX) {
    fecharCarrinho();
  }
});

function atualizarTextoItens() {
  if (carrinhoItensNumber > 1) {
    totalP.textContent = "Itens";
  } else {
    totalP.textContent = "Item";
  }
  if (carrinhoItensNumber === 0) {

}
}

// ============================
// ADICIONAR ITEM AO CARRINHO
// ============================

adicionarItemButtons.forEach(button => {
  button.addEventListener("click", () => {
totalItens.style.display = "flex"
    const item = button.closest(".item");
    const title = item.dataset.title;
    const price = parseFloat(item.dataset.price);
    const img = item.dataset.img;

    // Procura item igual no carrinho
    const existingItem = [...document.querySelectorAll(".carrinho-item")]
      .find(i => i.dataset.title === title);

    if (existingItem) {

      const display = existingItem.querySelector(".carrinho-item-amount-number");
      let quantidade = parseInt(display.textContent);

      quantidade++;
      display.textContent = quantidade;

      carrinhoTotalPrice += price;
      carrinhoTotalNumberDisplay.textContent = carrinhoTotalPrice.toFixed(2);
      totalItemPrice.textContent = carrinhoTotalPrice.toFixed(2);

      carrinhoItensNumber++;
      navButtonFloatNumber.textContent = carrinhoItensNumber;
      totalItemAmout.textContent = carrinhoItensNumber;
atualizarTextoItens();
atualizarMensagemWhatsapp();
      return;
    }

    // ============================
    // ITEM NOVO NO CARRINHO
    // ============================

    const carrinhoItem = document.createElement("div");
    carrinhoItem.classList.add("carrinho-item");
    carrinhoItem.dataset.title = title;

    carrinhoItem.innerHTML = `
      <div class="carrinho-info-container">
        <img src="${img}" alt="${title}">
        <div class="carrinho-item-info">
          <h4>${title}</h4>
          <p>R$ ${price.toFixed(2)}</p>
        </div>
      </div>

      <div class="carrinho-item-amount">

      <button class="buttonRemoveItem carrinho-buttons"><i class="fa-solid fa-minus"></i></button>
        <span class="carrinho-item-amount-number">1</span>
      <button class="buttonAddItem carrinho-buttons"><i class="fa-solid fa-plus"></i></button>
      </div>
    `;

    itensContainer.appendChild(carrinhoItem);

    carrinhoTotalPrice += price;
    carrinhoTotalNumberDisplay.textContent = carrinhoTotalPrice.toFixed(2);
    totalItemPrice.textContent = carrinhoTotalPrice.toFixed(2);

    carrinhoItensNumber++;
    navButtonFloatNumber.style.display = "flex";
    navButtonFloatNumber.textContent = carrinhoItensNumber;
    totalItemAmout.textContent = carrinhoItensNumber;
    atualizarTextoItens();
    atualizarMensagemWhatsapp();

    // ============================
    // BOTÕES DE + E -
    // ============================

    const btnAdd = carrinhoItem.querySelector(".buttonAddItem");
    const btnRemove = carrinhoItem.querySelector(".buttonRemoveItem");
    const display = carrinhoItem.querySelector(".carrinho-item-amount-number");

    // AUMENTAR ITEM
    btnAdd.addEventListener("click", () => {
      let quantidade = parseInt(display.textContent);
      quantidade++;
      display.textContent = quantidade;

      carrinhoTotalPrice += price;
      carrinhoTotalNumberDisplay.textContent = carrinhoTotalPrice.toFixed(2);
      totalItemPrice.textContent = carrinhoTotalPrice.toFixed(2);

      carrinhoItensNumber++;
      navButtonFloatNumber.textContent = carrinhoItensNumber;
      totalItemAmout.textContent = carrinhoItensNumber;
      atualizarTextoItens();
      atualizarMensagemWhatsapp();

    });

    // REMOVER ITEM
    btnRemove.addEventListener("click", () => {
      let quantidade = parseInt(display.textContent);

      if (quantidade > 1) {
        quantidade--;
        display.textContent = quantidade;
      } else {
        carrinhoItem.remove();
      }

      carrinhoTotalPrice -= price;
      carrinhoTotalNumberDisplay.textContent = carrinhoTotalPrice.toFixed(2);
      totalItemPrice.textContent = carrinhoTotalPrice.toFixed(2);

      carrinhoItensNumber--;
      navButtonFloatNumber.textContent = carrinhoItensNumber;
      totalItemAmout.textContent = carrinhoItensNumber;

      if (carrinhoItensNumber === 0) {
        navButtonFloatNumber.style.display = "none";
        carrinhoVazio.style.display = "flex";
        carrinhoCheio.style.display = "none";
        itensContainer.style.display = "none";
        totalItens.style.display = "none";
        
      }
      atualizarTextoItens();
atualizarMensagemWhatsapp();
    });
  });
});
let generatedMessage = "";
const btnWhatsapp = document.getElementById("btn-whatsapp");

let mensagemWhatsapp = "";

btnWhatsapp.addEventListener("click", () => {
  const numero = "5577991454020"; // número do estabelecimento
  const link = `https://wa.me/${numero}?text=${generatedMessage}`;
  window.open(link, "_blank");
});

function atualizarMensagemWhatsapp() {
  const itensCarrinho = document.querySelectorAll(".carrinho-item");

  let mensagem = "Olá! Gostaria de fazer um pedido:%0A%0A";

  itensCarrinho.forEach(item => {
    const titulo = item.dataset.title;
    const preco = parseFloat(item.querySelector("p").textContent.replace("R$ ", ""));
    const quantidade = parseInt(item.querySelector(".carrinho-item-amount-number").textContent);

    mensagem += `• ${quantidade}x ${titulo} - R$ ${(preco * quantidade).toFixed(2)}%0A`;
  });

  mensagem += `%0A*Total:* R$ ${carrinhoTotalPrice.toFixed(2)}`;

  generatedMessage = mensagem; // agora funciona corretamente
}

AOS.init({
  offset: 100,        // distância do elemento até o topo da tela antes de animar
  delay: 0,           // sem atraso
  duration: 1000,      // duração de 400ms
  easing: 'ease',     // tipo de transição
  once: true,        // anima de novo toda vez que o elemento entra na tela
  mirror: false,      // não anima de novo ao rolar pra cima
  anchorPlacement: 'top-bottom', // ponto de disparo da animação
});