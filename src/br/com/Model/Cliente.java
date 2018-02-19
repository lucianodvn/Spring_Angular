package br.com.Model;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import org.hibernate.annotations.ForeignKey;

@Entity
public class Cliente{
	
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private long id;
	private String nome;
	private String sexo;
	private String endereco;
	private String telefone;
	private Boolean ativo;
	private String interesse;
	private String cpf;
	
	@Column(columnDefinition="text")
	private String foto;
		
	@ManyToOne(fetch=FetchType.EAGER)
	@ForeignKey(name="estados_fk")
	private Estados estados = new Estados();
	
	@ManyToOne(fetch=FetchType.EAGER)
	@ForeignKey(name="cidades_fk")
	private Cidades cidades = new Cidades();
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	public String getSexo() {
		return sexo;
	}
	public void setSexo(String sexo) {
		this.sexo = sexo;
	}
	public String getEndereco() {
		return endereco;
	}
	public void setEndereco(String endereco) {
		this.endereco = endereco;
	}
	public String getTelefone() {
		return telefone;
	}
	public void setTelefone(String telefone) {
		this.telefone = telefone;
	}
	
	public void setAtivo(Boolean ativo) {
		if(ativo == null) {
			this.ativo = false;
			this.ativo = ativo;
		}
	}
	
	public Boolean getAtivo() {
		return ativo;
	}
	
	public void setInteresse(String interesse) {
		this.interesse = interesse;
	}
	
	public String getInteresse() {
		return interesse;
	}
	
	public Estados getEstados() {
		return estados;
	}
	public void setEstados(Estados estados) {
		this.estados = estados;
	}
	public Cidades getCidades() {
		return cidades;
	}
	public void setCidades(Cidades cidades) {
		this.cidades = cidades;
	}
	
	public String getFoto() {
		return foto;
	}
	public void setFoto(String foto) {
		this.foto = foto;
	}
	
	public void setCpf(String cpf) {
		this.cpf = cpf;
	}
	
	public String getCpf() {
		return cpf;
	}
	
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + (int) (id ^ (id >>> 32));
		return result;
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Cliente other = (Cliente) obj;
		if (id != other.id)
			return false;
		return true;
	}
	
}
