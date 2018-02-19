package br.com.Controller;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;

import br.com.DAO.DaoImplementcao;
import br.com.DAO.InterfaceDAO;
import br.com.Model.Livro;
import br.com.Model.Pedido;
import br.com.Model.itensPedido;

@Controller
@RequestMapping(value = "/itempedido")
public class ItemPedidoController extends DaoImplementcao<itensPedido> implements InterfaceDAO<itensPedido> {

	@Autowired
	private LivroController livroController;
	
	public ItemPedidoController(Class<itensPedido> persistenceClass) {
		super(persistenceClass);
		// TODO Auto-generated constructor stub
	}

	@RequestMapping(value = "processar/{itens}")
	public @ResponseBody String processar(@PathVariable("itens") String itens) throws Exception {
		List<Livro> livros = livroController.lista(itens);
		List<itensPedido> itemPedidos = new ArrayList<itensPedido>();
		Pedido pedido = new Pedido();
		BigDecimal valorTotal = BigDecimal.ZERO;
		
		
		for(Livro livro: livros) {
			String valor = livro.getValor().replace("R", "").replace("$", "").replaceAll("\\.", "").replaceAll("\\,", ".");
			valorTotal = valorTotal.add(new BigDecimal(valor.trim()));
			
		}
		pedido.setValorTotal("R$ " + valorTotal.setScale(2, RoundingMode.HALF_DOWN).toString());
		for(Livro livro: livros) {
			itensPedido itemPedido = new itensPedido();
			itemPedido.setLivro(livro);
			itemPedido.setPedido(pedido);
			itemPedido.setQuantidade(1L);
			itemPedidos.add(itemPedido);
		}
		
		return new Gson().toJson(itemPedidos);

	}

	@Override
	public List<itensPedido> consultaPaginada(String numeroPagina) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	public LivroController getLivroController() {
		return livroController;
	}

	public void setLivroController(LivroController livroController) {
		this.livroController = livroController;
	}
	
	

}
