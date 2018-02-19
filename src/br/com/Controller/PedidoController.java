package br.com.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import br.com.DAO.DaoImplementcao;
import br.com.DAO.InterfaceDAO;
import br.com.Model.Pedido;

@Controller
@RequestMapping(value="/pedido")
public class PedidoController extends DaoImplementcao<Pedido> implements InterfaceDAO<Pedido> {
	
	@Autowired
	private ItemPedidoController itemPedidoController;
	
	public PedidoController(Class<Pedido> persistenceClass) {
		super(persistenceClass);
		// TODO Auto-generated constructor stub
	}

	@Override
	public List<Pedido> consultaPaginada(String numeroPagina) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}
}
